(function(){
  const FRESATTO_ID = 3;
  const money = value => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number(value)||0);
  const esc = value => { const d=document.createElement('div'); d.textContent=String(value ?? ''); return d.innerHTML; };
  const choice = v => typeof v==='string' ? {name:v,price:0} : v;
  const values = (state,id) => { const v=state[id]; return v ? (Array.isArray(v)?v:[v]) : []; };
  let modal=null;
  let active=null;

  function isFresatto(){
    const id=new URLSearchParams(location.search).get('id');
    return String(id)==='3'||Number(window.currentRestaurant?.id)===3||String(window.currentRestaurant?.name||'').toLowerCase()==='fresatto';
  }
  function getStep(product,id){return product?.customization?.steps?.find(s=>s.id===id);}
  function dynamicMax(product,step,state){
    const size=getStep(product,'size');
    const selected=values(state,'size')[0];
    if(size&&selected){
      const c=(size.choices||[]).map(choice).find(x=>x.name===selected);
      if(c){
        if(step.id==='topping'&&Number.isFinite(c.toppingMax))return c.toppingMax;
        if(step.id==='base'&&Number.isFinite(c.baseMax))return c.baseMax;
        if(step.id==='untable'&&Number.isFinite(c.untableMax))return c.untableMax;
      }
    }
    return Number.isFinite(step.max)?step.max:null;
  }
  function price(product,state){
    let total=Number(product.price)||0,replaced=false;
    (product.customization?.steps||[]).forEach(step=>values(state,step.id).forEach(v=>{
      const c=(step.choices||[]).map(choice).find(x=>x.name===v); if(!c)return;
      if(step.priceMode==='replace'&&!replaced){total=Number(c.price)||0;replaced=true;}
      else if(step.priceMode!=='replace')total+=Number(c.price)||0;
    }));
    return total;
  }
  function summary(product,state){
    return (product.customization?.steps||[]).map(step=>{
      const v=values(state,step.id).filter(x=>x!=='No'); if(!v.length)return '';
      const label=step.title.replace(/^Elige\s+/i,'').replace(/\s*\(.+?\)\s*$/,'');
      return `${label}: ${v.join(', ')}`;
    }).filter(Boolean).join(' • ');
  }
  function ensureModal(){
    if(modal)return modal;
    modal=document.createElement('div');
    modal.className='product-configurator-modal';
    modal.id='fresattoConfiguratorFixModal';
    modal.innerHTML=`<div class="product-configurator-backdrop"></div><section class="product-configurator-dialog" role="dialog" aria-modal="true"><button type="button" class="product-config-close" aria-label="Cerrar">×</button><div class="product-config-head"><span class="eyebrow">PERSONALIZA TU PEDIDO</span><h2 id="fixConfigTitle"></h2><p id="fixConfigDesc"></p></div><div id="fixConfigBody" class="product-config-body"></div><div class="product-config-footer"><div><span>Total</span><strong id="fixConfigTotal">$0</strong></div><button type="button" id="fixConfigConfirm" class="btn btn-primary">Agregar al pedido</button></div></section></div>`;
    document.body.appendChild(modal);
    const close=()=>{modal.classList.remove('is-open');document.body.classList.remove('modal-open');active=null;};
    modal.querySelector('.product-config-close').addEventListener('click',close);
    modal.querySelector('.product-config-backdrop').addEventListener('click',close);
    modal.querySelector('#fixConfigConfirm').addEventListener('click',()=>{if(active&&valid(active.product,active.state)){addToCart(active.product,active.state);close();}});
    return modal;
  }
  function valid(product,state){return(product.customization?.steps||[]).every(s=>!s.required||values(state,s.id).length>=(Number.isFinite(s.min)?s.min:1));}
  function select(ctx,id,value){
    const step=getStep(ctx.product,id); if(!step)return;
    const current=values(ctx.state,id);
    if(step.type==='multiple'){
      const max=dynamicMax(ctx.product,step,ctx.state);
      ctx.state[id]=current.includes(value)?current.filter(v=>v!==value):[...current,value];
      if(Number.isFinite(max))ctx.state[id]=ctx.state[id].slice(0,max);
    }else{
      ctx.state[id]=value;
      if(id==='size'){
        ['topping','base','untable'].forEach(otherId=>{
          const other=getStep(ctx.product,otherId); if(!other)return;
          const max=dynamicMax(ctx.product,other,ctx.state);
          if(Number.isFinite(max))ctx.state[otherId]=values(ctx.state,otherId).slice(0,max);
        });
      }
    }
  }
  function bindChoiceButtons(){
    if(!modal)return;
    modal.querySelectorAll('.config-choice').forEach(button=>{
      button.onclick=e=>{
        e.preventDefault();
        if(button.disabled||!active)return;
        select(active,button.dataset.step,button.dataset.value);
        render();
      };
    });
  }
  function render(){
    if(!active)return;
    const m=ensureModal(),body=m.querySelector('#fixConfigBody');
    body.innerHTML=(active.product.customization?.steps||[]).map((step,i)=>{
      const selected=values(active.state,step.id),max=dynamicMax(active.product,step,active.state);
      const limit=step.type==='multiple'&&max?`<small class="config-limit">Hasta ${max}</small>`:'';
      const opts=(step.choices||[]).map(raw=>{
        const c=choice(raw),on=selected.includes(c.name),disabled=step.type==='multiple'&&!on&&Number.isFinite(max)&&selected.length>=max;
        return `<button type="button" class="config-choice ${on?'selected':''}" data-step="${esc(step.id)}" data-value="${esc(c.name)}" ${disabled?'disabled':''} aria-pressed="${on?'true':'false'}"><span class="config-choice-check">${on?'✓':''}</span><span class="config-choice-main"><strong>${esc(c.name)}</strong>${Number(c.price)>0?`<small>+ ${money(c.price)}</small>`:''}</span></button>`;
      }).join('');
      return `<section class="config-step"><div class="config-step-head"><div><span class="config-step-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(step.title)}</h3></div>${limit}</div><div class="config-choices">${opts}</div></section>`;
    }).join('');
    m.querySelector('#fixConfigTitle').textContent=active.product.name;
    m.querySelector('#fixConfigDesc').textContent=active.product.description||'Elige las opciones que deseas.';
    m.querySelector('#fixConfigTotal').textContent=money(price(active.product,active.state));
    m.querySelector('#fixConfigConfirm').disabled=!valid(active.product,active.state);
    bindChoiceButtons();
  }
  function addToCart(product,state){
    const text=summary(product,state),unit=price(product,state),key=`${product.id}|${text||'base'}`;
    const cart=window.__domiflashRestaurantCart||(window.__domiflashRestaurantCart=[]);
    const existing=cart.find(x=>x.key===key);
    if(existing)existing.qty+=1;else cart.push({...product,key,price:unit,customization:{...state},customizationText:text,qty:1});
    renderCart();
  }
  function renderCart(){
    const cart=window.__domiflashRestaurantCart||[],box=document.getElementById('cartItems'),badge=document.getElementById('cartBadge'),totalEl=document.getElementById('cartTotal'),order=document.getElementById('whatsappOrder');
    const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+(Number(x.price)||0)*x.qty,0);
    if(badge)badge.textContent=count;if(totalEl)totalEl.textContent=money(total);if(order)order.disabled=!cart.length;if(!box)return;
    box.innerHTML=cart.length?cart.map(item=>`<div class="cart-row"><div class="cart-row-top"><span class="cart-row-name">${esc(item.name)}</span><span class="cart-row-price">${money(item.price*item.qty)}</span></div>${item.customizationText?`<div class="cart-customization">${esc(item.customizationText)}</div>`:''}<div class="cart-controls"><button type="button" data-fix-key="${esc(item.key)}" data-fix-delta="-1">−</button><span>${item.qty}</span><button type="button" data-fix-key="${esc(item.key)}" data-fix-delta="1">+</button></div></div>`).join(''):`<div class="empty-cart">Tu carrito está vacío.<br>Agrega productos de la carta.</div>`;
    box.querySelectorAll('[data-fix-key]').forEach(b=>b.onclick=()=>{const item=cart.find(x=>x.key===b.dataset.fixKey);if(!item)return;item.qty+=Number(b.dataset.fixDelta);if(item.qty<=0)window.__domiflashRestaurantCart=cart.filter(x=>x.key!==item.key);renderCart();});
  }
  function open(product){active={product,state:{}};const m=ensureModal();m.classList.add('is-open');document.body.classList.add('modal-open');render();}
  document.addEventListener('click',function(e){
    if(!isFresatto())return;
    const button=e.target.closest('.menu-add');if(!button)return;
    const product=(window.currentRestaurant?.menu||[]).find(p=>String(p.id)===String(button.dataset.productId));
    if(!product?.customization?.steps?.length)return;
    e.preventDefault();e.stopImmediatePropagation();open(product);
  },true);
})();