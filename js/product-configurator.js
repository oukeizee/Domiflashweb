/* =========================================
   CONFIGURADOR DE PRODUCTOS DOMIFLASH
   ========================================= */

(function(){
  const FRESATTO_ID = 3;
  const escape = window.escapeHtml || (value => String(value ?? ""));
  const fmtMoney = value => new Intl.NumberFormat("es-CO", { style:"currency", currency:"COP", maximumFractionDigits:0 }).format(Number(value) || 0);

  function applyFresattoMenu(){
    if (!Array.isArray(window.RESTAURANTS) || !Array.isArray(window.FRESATTO_MENU)) return;
    const restaurant = window.RESTAURANTS.find(r => Number(r.id) === FRESATTO_ID);
    if (restaurant) restaurant.menu = window.FRESATTO_MENU.filter(product => !product.hiddenFromMenu);
  }

  function choiceObject(choice){ return typeof choice === "string" ? {name:choice, price:0} : choice; }
  function selectedValues(state, stepId){ const value = state[stepId]; if (!value) return []; return Array.isArray(value) ? value : [value]; }
  function getStep(product, id){ return product?.customization?.steps?.find(step => step.id === id); }

  function getDynamicMax(product, step, state){
    const sizeStep = getStep(product, "size");
    const selectedSize = selectedValues(state, "size")[0];
    const sizeChoice = sizeStep && selectedSize ? choiceObject(sizeStep.choices.find(item => choiceObject(item).name === selectedSize)) : null;
    if (sizeChoice) {
      if (step.id === "topping" && Number.isFinite(sizeChoice.toppingMax)) return sizeChoice.toppingMax;
      if (step.id === "base" && Number.isFinite(sizeChoice.baseMax)) return sizeChoice.baseMax;
      if (step.id === "untable" && Number.isFinite(sizeChoice.untableMax)) return sizeChoice.untableMax;
    }
    return Number.isFinite(step.max) ? step.max : null;
  }

  function getConfiguredPrice(product, state){
    let total = Number(product.price) || 0;
    let replacementApplied = false;
    (product.customization?.steps || []).forEach(step => {
      selectedValues(state, step.id).forEach(value => {
        const choice = choiceObject((step.choices || []).find(item => choiceObject(item).name === value));
        if (!choice) return;
        if (step.priceMode === "replace" && !replacementApplied) {
          total = Number(choice.price) || 0;
          replacementApplied = true;
        } else if (step.priceMode !== "replace") {
          total += Number(choice.price) || 0;
        }
      });
    });
    return total;
  }

  function getConfigSummary(product, state){
    const parts = [];
    (product.customization?.steps || []).forEach(step => {
      const values = selectedValues(state, step.id).filter(value => value !== "No");
      if (!values.length) return;
      const label = step.title.replace(/^Elige\s+/i, "").replace(/\s*\(.+?\)\s*$/, "");
      parts.push(`${label}: ${values.join(", ")}`);
    });
    return parts.join(" • ");
  }

  function ensureModal(){
    let modal = document.getElementById("productConfiguratorModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "productConfiguratorModal";
    modal.className = "product-configurator-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="product-configurator-backdrop" data-config-close></div>
      <section class="product-configurator-dialog" role="dialog" aria-modal="true" aria-labelledby="productConfiguratorTitle">
        <button class="product-config-close" type="button" aria-label="Cerrar">×</button>
        <div class="product-config-head"><span class="eyebrow">PERSONALIZA TU PEDIDO</span><h2 id="productConfiguratorTitle"></h2><p id="productConfiguratorDescription"></p></div>
        <div id="productConfiguratorBody" class="product-config-body"></div>
        <div class="product-config-footer"><div><span>Total</span><strong id="productConfiguratorTotal">$0</strong></div><button id="productConfiguratorConfirm" class="btn btn-primary" type="button">Agregar al pedido</button></div>
      </section>`;
    document.body.appendChild(modal);
    return modal;
  }

  let session = null;

  function openConfigurator(product, onConfirm){
    if (!product?.customization?.steps?.length) return false;
    const modal = ensureModal();
    const title = modal.querySelector("#productConfiguratorTitle");
    const description = modal.querySelector("#productConfiguratorDescription");
    const body = modal.querySelector("#productConfiguratorBody");
    const total = modal.querySelector("#productConfiguratorTotal");
    const confirm = modal.querySelector("#productConfiguratorConfirm");
    session = { product, state:{}, onConfirm };
    title.textContent = product.name;
    description.textContent = product.description || "Elige las opciones que deseas.";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      session = null;
    };
    const valid = () => (product.customization.steps || []).every(step => !step.required || selectedValues(session.state, step.id).length >= (Number.isFinite(step.min) ? step.min : 1));

    const render = () => {
      if (!session) return;
      body.innerHTML = (product.customization.steps || []).map((step, index) => {
        const values = selectedValues(session.state, step.id);
        const max = getDynamicMax(product, step, session.state);
        const limit = step.type === "multiple" && max ? `<small class="config-limit">Hasta ${max}</small>` : "";
        const options = (step.choices || []).map(raw => {
          const choice = choiceObject(raw);
          const selected = values.includes(choice.name);
          const disabled = step.type === "multiple" && !selected && Number.isFinite(max) && values.length >= max;
          return `<button type="button" class="config-choice ${selected ? "selected" : ""}" data-step="${escape(step.id)}" data-value="${escape(choice.name)}" ${disabled ? "disabled" : ""}><span class="config-choice-check">${selected ? "✓" : ""}</span><span class="config-choice-main"><strong>${escape(choice.name)}</strong>${Number(choice.price)>0 ? `<small>+ ${fmtMoney(choice.price)}</small>` : ""}</span></button>`;
        }).join("");
        return `<section class="config-step"><div class="config-step-head"><div><span class="config-step-number">${String(index+1).padStart(2,"0")}</span><h3>${escape(step.title)}</h3></div>${limit}</div><div class="config-choices">${options}</div></section>`;
      }).join("");
      total.textContent = fmtMoney(getConfiguredPrice(product, session.state));
      confirm.disabled = !valid();
    };

    body.onclick = event => {
      const button = event.target.closest(".config-choice");
      if (!button || button.disabled || !session) return;
      const step = product.customization.steps.find(item => item.id === button.dataset.step);
      if (!step) return;
      const current = selectedValues(session.state, step.id);
      if (step.type === "multiple") {
        const max = getDynamicMax(product, step, session.state);
        session.state[step.id] = current.includes(button.dataset.value) ? current.filter(value => value !== button.dataset.value) : [...current, button.dataset.value];
        if (Number.isFinite(max)) session.state[step.id] = session.state[step.id].slice(0, max);
      } else {
        session.state[step.id] = button.dataset.value;
        if (step.id === "size") {
          ["topping","base","untable"].forEach(id => {
            const other = getStep(product,id);
            if (!other) return;
            const max = getDynamicMax(product,other,session.state);
            if (Number.isFinite(max)) session.state[id] = selectedValues(session.state,id).slice(0,max);
          });
        }
      }
      render();
    };

    confirm.onclick = () => {
      if (!session || !valid()) return;
      const result = { unitPrice:getConfiguredPrice(product,session.state), customization:{...session.state}, customizationText:getConfigSummary(product,session.state) };
      const callback = session.onConfirm;
      close();
      callback?.(result);
    };
    modal.querySelector(".product-config-close").onclick = close;
    modal.querySelector("[data-config-close]").onclick = close;
    render();
    return true;
  }

  function isConfigured(product){ return !!product?.customization?.steps?.length; }

  const baseInitMenuPage = window.initMenuPage;
  window.initMenuPage = function(){
    const params = new URLSearchParams(window.location.search);
    const restaurant = typeof window.getRestaurantById === "function" ? window.getRestaurantById(params.get("id")) : null;
    const nameEl = document.getElementById("restaurantName");
    const menuGrid = document.getElementById("menuGrid");
    if (!restaurant || !nameEl || !menuGrid) {
      if (nameEl) nameEl.textContent = "Restaurante no encontrado";
      if (menuGrid) menuGrid.innerHTML = `<div class="empty-cart">Regresa a Restaurantes y selecciona una opción válida.</div>`;
      return;
    }
    document.title = `${restaurant.name} | Domiflash`;
    nameEl.textContent = restaurant.name;
    window.currentRestaurant = restaurant;
    window.__domiflashRestaurantCart = [];
    menuGrid.innerHTML = restaurant.menu.filter(product => !product.hiddenFromMenu).map(product => {
      const hasPrice = Number(product.price) > 0;
      const configurable = isConfigured(product);
      return `<article class="menu-item reveal"><h3>${escape(product.name)}</h3><p>${escape(product.description || "Producto de la carta Domiflash.")}</p><div class="menu-price">${hasPrice ? fmtMoney(product.price) : "Precio por completar"}</div><button class="btn btn-primary menu-add" ${hasPrice ? "" : "disabled"} data-product-id="${product.id}">${hasPrice ? `<span>${configurable ? "Personalizar y agregar" : "Agregar al pedido"}</span>` : "Disponible próximamente"}</button></article>`;
    }).join("");

    const cart = () => window.__domiflashRestaurantCart;
    const addItem = (product,result) => {
      const key = `${product.id}|${result.customizationText || "base"}`;
      const existing = cart().find(item => item.key === key);
      if (existing) existing.qty += 1;
      else cart().push({...product,key,price:result.unitPrice,customization:result.customization,customizationText:result.customizationText,qty:1});
      renderCart();
    };
    const addNormal = product => {
      const key = `${product.id}|base`;
      const existing = cart().find(item => item.key === key);
      if (existing) existing.qty += 1;
      else cart().push({...product,key,qty:1});
      renderCart();
    };
    function renderCart(){
      const container=document.getElementById("cartItems"), badge=document.getElementById("cartBadge"), totalEl=document.getElementById("cartTotal"), orderBtn=document.getElementById("whatsappOrder");
      const items=cart(), count=items.reduce((sum,item)=>sum+item.qty,0), total=items.reduce((sum,item)=>sum+(Number(item.price)||0)*item.qty,0);
      if(badge)badge.textContent=count; if(totalEl)totalEl.textContent=fmtMoney(total); if(orderBtn)orderBtn.disabled=!items.length; if(!container)return;
      if(!items.length){container.innerHTML=`<div class="empty-cart">Tu carrito está vacío.<br>Agrega productos de la carta.</div>`;return;}
      container.innerHTML=items.map(item=>`<div class="cart-row"><div class="cart-row-top"><span class="cart-row-name">${escape(item.name)}</span><span class="cart-row-price">${fmtMoney(item.price*item.qty)}</span></div>${item.customizationText?`<div class="cart-customization">${escape(item.customizationText)}</div>`:""}<div class="cart-controls"><button type="button" data-cart-key="${escape(item.key)}" data-cart-delta="-1">−</button><span>${item.qty}</span><button type="button" data-cart-key="${escape(item.key)}" data-cart-delta="1">+</button></div></div>`).join("");
      container.querySelectorAll("[data-cart-key]").forEach(button=>button.addEventListener("click",()=>{const item=items.find(entry=>entry.key===button.dataset.cartKey);if(!item)return;item.qty+=Number(button.dataset.cartDelta);if(item.qty<=0)window.__domiflashRestaurantCart=items.filter(entry=>entry.key!==item.key);renderCart();}));
    }
    menuGrid.querySelectorAll(".menu-add").forEach(button=>button.addEventListener("click",()=>{const product=restaurant.menu.find(item=>String(item.id)===String(button.dataset.productId));if(!product||!product.price)return;if(isConfigured(product))openConfigurator(product,result=>addItem(product,result));else addNormal(product);}));
    renderCart();
    document.getElementById("whatsappOrder")?.addEventListener("click",()=>{const items=cart();if(!items.length)return;const lines=["Hola Domiflash, quiero hacer un pedido.","",`Restaurante: ${restaurant.name}`];items.forEach(item=>{lines.push(`• ${item.qty} x ${item.name} — ${fmtMoney(item.price*item.qty)}`);if(item.customizationText)lines.push(`  Opciones: ${item.customizationText}`);else if(item.description)lines.push(`  Ingredientes: ${item.description}`);});lines.push("",`TOTAL: ${fmtMoney(items.reduce((sum,item)=>sum+item.price*item.qty,0))}`);window.open(`https://wa.me/573184947037?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener");});
  };

  const baseInitOrderBuilderPage = window.initOrderBuilderPage;
  window.initOrderBuilderPage = function(){
    const listEl=document.getElementById("orderRestaurantList"); if(!listEl)return;
    const search=document.getElementById("orderRestaurantSearch"), countEl=document.getElementById("selectedRestaurantCount"), badge=document.getElementById("orderBadge"), summary=document.getElementById("selectedRestaurantSummary"), otherCheck=document.getElementById("otherCheck"), otherRequest=document.getElementById("otherRequest"), sendBtn=document.getElementById("sendCustomOrder"), notes=document.getElementById("orderNotes"), modal=document.getElementById("restaurantMenuModal"), modalName=document.getElementById("modalRestaurantName"), modalProducts=document.getElementById("modalMenuProducts"), modalTotal=document.getElementById("modalRestaurantTotal"), confirmBtn=document.getElementById("confirmRestaurantOrder"), closeBtn=document.getElementById("closeMenuModal");
    const selected=new Map(); let activeRestaurant=null; let draftItems=new Map();
    const getRestaurants=()=>Array.isArray(window.RESTAURANTS)?window.RESTAURANTS:[];
    const getRestaurant=id=>getRestaurants().find(r=>String(r.id)===String(id));
    const itemKey=item=>item.key || `${item.product.id}|base`;
    const itemTotal=item=>(Number(item.unitPrice ?? item.product.price)||0)*item.qty;
    const grandTotal=()=>[...selected.values()].reduce((sum,order)=>sum+order.items.reduce((s,item)=>s+itemTotal(item),0),0);

    function openRestaurantMenu(restaurant){activeRestaurant=restaurant;draftItems=new Map();const previous=selected.get(restaurant.id);if(previous)previous.items.forEach(item=>draftItems.set(itemKey(item),{...item}));modalName.textContent=restaurant.name;renderModalProducts();modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");}
    function closeRestaurantMenu(){modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");activeRestaurant=null;}
    function addDraftProduct(product,result){const key=`${product.id}|${result.customizationText || "base"}`;const existing=draftItems.get(key);if(existing)existing.qty+=1;else draftItems.set(key,{product,qty:1,key,unitPrice:result.unitPrice,customization:result.customization,customizationText:result.customizationText});renderModalProducts();}
    function addDraftNormal(product){const key=`${product.id}|base`;const existing=draftItems.get(key);if(existing)existing.qty+=1;else draftItems.set(key,{product,qty:1,key,unitPrice:Number(product.price)||0});renderModalProducts();}
    function renderModalProducts(){
      const products=Array.isArray(activeRestaurant?.menu)?activeRestaurant.menu.filter(p=>!p.hiddenFromMenu):[];
      if(!products.length){modalProducts.innerHTML=`<div class="empty-cart">Este restaurante todavía no tiene productos cargados.</div>`;modalTotal.textContent=fmtMoney(0);return;}
      modalProducts.innerHTML=products.map(product=>{const items=[...draftItems.values()].filter(item=>Number(item.product.id)===Number(product.id));const qty=items.reduce((sum,item)=>sum+item.qty,0);const configurable=isConfigured(product);return `<article class="modal-product-card ${qty?"has-quantity":""}"><div class="modal-product-info"><h3>${escape(product.name)}</h3><p>${escape(product.description||"Producto disponible en la carta.")}</p><strong>${fmtMoney(product.price)}${configurable?" · Personalizable":""}</strong>${items.filter(item=>item.customizationText).map(item=>`<div class="modal-item-config">${escape(item.customizationText)} <b>×${item.qty}</b></div>`).join("")}</div><div class="modal-product-actions">${configurable?`<button type="button" class="btn btn-primary modal-customize-btn" data-product-id="${product.id}">Personalizar</button>${qty?`<span class="modal-qty-label">${qty} seleccionado${qty===1?"":"s"}</span>`:""}`:`<div class="quantity-control"><button type="button" class="qty-btn" data-qty="-1" data-product-id="${product.id}" ${qty===0?"disabled":""}>−</button><span>${qty}</span><button type="button" class="qty-btn" data-qty="1" data-product-id="${product.id}">+</button></div>`}</div></article>`;}).join("");
      modalTotal.textContent=fmtMoney([...draftItems.values()].reduce((sum,item)=>sum+itemTotal(item),0));
      modalProducts.querySelectorAll(".qty-btn").forEach(button=>button.addEventListener("click",()=>{const product=products.find(p=>String(p.id)===String(button.dataset.productId));if(!product)return;const delta=Number(button.dataset.qty);if(delta>0)addDraftNormal(product);else{const entries=[...draftItems.values()].filter(item=>Number(item.product.id)===Number(product.id));const last=entries[entries.length-1];if(!last)return;last.qty-=1;if(last.qty<=0)draftItems.delete(last.key);renderModalProducts();}}));
      modalProducts.querySelectorAll(".modal-customize-btn").forEach(button=>button.addEventListener("click",()=>{const product=products.find(p=>String(p.id)===String(button.dataset.productId));if(product)openConfigurator(product,result=>addDraftProduct(product,result));}));
    }
    function render(filter=""){
      const term=String(filter||"").trim().toLocaleLowerCase("es");const visible=getRestaurants().filter(r=>String(r.name||"").toLocaleLowerCase("es").includes(term));
      if(!visible.length){listEl.innerHTML=`<div class="empty-cart">No encontramos ese restaurante.</div>`;return;}
      listEl.innerHTML=visible.map(r=>{const order=selected.get(r.id);const qty=order?order.items.reduce((sum,item)=>sum+item.qty,0):0;return `<button type="button" class="restaurant-order-card ${order?"confirmed":""}" data-restaurant-id="${r.id}"><span class="restaurant-order-check">${order?"✓":"+"}</span><span class="restaurant-order-content"><strong>${escape(r.name)}</strong><small>${order?`${qty} producto${qty===1?"":"s"} seleccionado${qty===1?"":"s"}`:"Toca para abrir la carta"}</small></span><span class="restaurant-order-arrow">›</span></button>`;}).join("");
      listEl.querySelectorAll(".restaurant-order-card").forEach(button=>button.addEventListener("click",()=>{const restaurant=getRestaurant(button.dataset.restaurantId);if(restaurant)openRestaurantMenu(restaurant);}));
    }
    function renderSummary(){
      const orders=[...selected.values()], otherActive=!!otherCheck?.checked, otherText=otherRequest?.value.trim()||"";
      if(countEl)countEl.textContent=`${orders.length} seleccionado${orders.length===1?"":"s"}`;
      const totalProducts=orders.reduce((sum,order)=>sum+order.items.reduce((s,item)=>s+item.qty,0),0);if(badge)badge.textContent=totalProducts+(otherActive?1:0);if(sendBtn)sendBtn.disabled=orders.length===0&&!(otherActive&&otherText);
      if(!orders.length&&!otherActive){summary.innerHTML=`<div class="empty-cart">Aún no has seleccionado restaurantes.<br>Toca un restaurante para abrir su carta.</div>`;}else{summary.innerHTML=orders.map(order=>{const total=order.items.reduce((sum,item)=>sum+itemTotal(item),0);const itemsText=order.items.map(item=>`${item.qty}× ${item.product.name}${item.customizationText?` (${item.customizationText})`:""}`).join(" · ");return `<button type="button" class="selected-restaurant-row selected-row-button" data-summary-id="${order.restaurant.id}"><span class="selected-dot">✓</span><strong>${escape(order.restaurant.name)}</strong><small>${escape(itemsText)}</small><em>${fmtMoney(total)}</em></button>`;}).join("")+(otherActive?`<div class="selected-restaurant-row other-summary"><span class="selected-dot">+</span><strong>Otro</strong><small>${escape(otherText||"Describe lo que deseas agregar.")}</small></div>`:"");summary.querySelectorAll("[data-summary-id]").forEach(button=>button.addEventListener("click",()=>{const restaurant=getRestaurant(button.dataset.summaryId);if(restaurant)openRestaurantMenu(restaurant);}));}
      const totalEl=document.getElementById("orderGrandTotal");if(totalEl)totalEl.textContent=fmtMoney(grandTotal());
    }
    function confirmActiveRestaurant(){if(!activeRestaurant)return;const items=[...draftItems.values()].filter(item=>item.qty>0);if(!items.length)selected.delete(activeRestaurant.id);else selected.set(activeRestaurant.id,{restaurant:activeRestaurant,items});closeRestaurantMenu();render(search?.value||"");renderSummary();}
    otherCheck?.addEventListener("change",()=>{otherRequest.disabled=!otherCheck.checked;if(!otherCheck.checked)otherRequest.value="";renderSummary();});otherRequest?.addEventListener("input",renderSummary);notes?.addEventListener("input",renderSummary);search?.addEventListener("input",e=>render(e.target.value));closeBtn?.addEventListener("click",closeRestaurantMenu);modal?.querySelector("[data-close-menu]")?.addEventListener("click",closeRestaurantMenu);confirmBtn?.addEventListener("click",confirmActiveRestaurant);
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("productConfiguratorModal")?.classList.contains("is-open")&&modal?.classList.contains("is-open"))closeRestaurantMenu();});
    sendBtn?.addEventListener("click",()=>{const orders=[...selected.values()];const lines=["Hola Domiflash, quiero armar un pedido con varios restaurantes.",""];if(orders.length){lines.push("PEDIDO POR RESTAURANTE:");orders.forEach(order=>{lines.push("",`📍 ${order.restaurant.name}`);order.items.forEach(item=>{lines.push(`• ${item.qty}× ${item.product.name} — ${fmtMoney(itemTotal(item))}`);if(item.customizationText)lines.push(`  Opciones: ${item.customizationText}`);else lines.push(`  Ingredientes: ${item.product.description||"No especificados"}`);});lines.push(`Subtotal: ${fmtMoney(order.items.reduce((sum,item)=>sum+itemTotal(item),0))}`);});}if(otherCheck?.checked&&otherRequest?.value.trim())lines.push("","OTRO:",`• ${otherRequest.value.trim()}`);if(notes?.value.trim())lines.push("","NOTAS:",notes.value.trim());lines.push("",`TOTAL DE PRODUCTOS: ${fmtMoney(grandTotal())}`,"","Por favor ayúdenme a confirmar disponibilidad, precios y el valor del domicilio.");window.open(`https://wa.me/573184947037?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener");});
    render();renderSummary();
  };

  applyFresattoMenu();
})();
