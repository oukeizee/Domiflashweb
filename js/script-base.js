
/* =========================================
   LOADER GLOBAL DOMIFLASH
   ========================================= */

const WHATSAPP = "573184947037";

function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function getRestaurantById(id) {
  return (window.RESTAURANTS || []).find(r => r.id === Number(id));
}

function getRestaurantDirectory() {
  return Array.isArray(window.RESTAURANT_DIRECTORY) ? window.RESTAURANT_DIRECTORY : [];
}

function renderDirectorySchedule() {
  const schedule = window.RESTAURANT_DIRECTORY_SCHEDULE;
  if (!schedule) return "";
  const days = Array.isArray(schedule.days) ? schedule.days : [];
  return `
    <div class="restaurant-schedule" aria-label="Horario de atención">
      <div class="restaurant-schedule-title">
        <span>Horario</span>
        <span class="restaurant-schedule-time">${schedule.open} – ${schedule.close}</span>
      </div>
      <div class="schedule-days" aria-label="Días de servicio">
        ${days.map(day => `<span class="schedule-day ${day.open ? "open" : "closed"}" title="${day.name}: ${day.open ? `${schedule.open} – ${schedule.close}` : "Cerrado"}">${day.label}</span>`).join("")}
      </div>
      <p class="restaurant-schedule-closed"><strong>Cierre:</strong> ${schedule.closedDays.join(", ")}</p>
    </div>
  `;
}

function renderRestaurants(filter = "") {
  const grid = document.getElementById("restaurantGrid");
  if (!grid) return;
  const restaurants = getRestaurantDirectory();
  const term = String(filter || "").trim().toLocaleLowerCase("es");
  const list = restaurants.filter(r => String(r.name || "").toLocaleLowerCase("es").includes(term));
  const count = document.getElementById("restaurantCount");
  if (count) count.textContent = `${list.length} restaurante${list.length === 1 ? "" : "s"}`;
  if (!list.length) {
    grid.innerHTML = `<div class="empty-cart restaurant-empty" style="grid-column:1/-1">No encontramos ese restaurante.</div>`;
    return;
  }
  grid.innerHTML = list.map((r, index) => `
    <article class="restaurant-card reveal has-restaurant-watermark" data-restaurant-id="${String(r.id)}" style="--logo-x:${((Number(r.id)-1)%5)*200}px;--logo-y:${Math.floor((Number(r.id)-1)/5)*200}px;animation-delay:${Math.min(index * 0.025, 0.35)}s">
      <div><span class="restaurant-number">${String(r.id).padStart(2, "0")}</span></div>
      ${String(r.id)==="3" ? "" : `<span class="restaurant-card-logo" role="img" aria-label="Logo del restaurante" style="background-image:url('https://raw.githubusercontent.com/oukeizee/Domiflashweb/main/assets/images/logos/restaurant-logos-sprite-27.jpg?v=20260918-11');background-size:500px 600px;background-position:-${((Number(r.id)-1)%5)*100}px -${Math.floor((Number(r.id)-1)/5)*100}px;background-repeat:no-repeat;"></span>`}
      <button class="restaurant-name-button" type="button" onclick="window.location.href='restaurante.html?id=${encodeURIComponent(r.id)}'">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7M3.5 3v5a2.5 2.5 0 0 0 5 0V3M6 10.5V21M17 3v18M17 3c2.2 1.7 3.5 4.2 3.5 7v1H17"/></svg><span>${escapeHtml(r.name)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
      </button>
      ${renderDirectorySchedule()}
    </article>
  `).join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function initRestaurantsPage() {
  const search = document.getElementById("restaurantSearch");
  if (!search) return;
  renderRestaurants();
  search.addEventListener("input", e => renderRestaurants(e.target.value));
}

let cart = [];

function initMenuPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const restaurant = getRestaurantById(id);
  const nameEl = document.getElementById("restaurantName");
  const menuGrid = document.getElementById("menuGrid");
  if (!restaurant || !nameEl || !menuGrid) {
    if (nameEl) nameEl.textContent = "Restaurante no encontrado";
    if (menuGrid) menuGrid.innerHTML = `<div class="empty-cart">Regresa a Restaurantes y selecciona una opción válida.</div>`;
    return;
  }
  document.title = `${restaurant.name} | Domiflash`;
  nameEl.textContent = restaurant.name;
  menuGrid.innerHTML = restaurant.menu.map(product => {
    const hasPrice = Number(product.price) > 0;
    return `
      <article class="menu-item reveal">
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description || "Producto de la carta Domiflash.")}</p>
        <div class="menu-price">${hasPrice ? money(product.price) : "Precio por completar"}</div>
        <button class="btn btn-primary menu-add" ${hasPrice ? "" : "disabled"} onclick="addToCart(${product.id})">
          ${hasPrice ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2 11h10l3-8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/></svg>Agregar al pedido` : `Disponible próximamente`}
        </button>
      </article>
    `;
  }).join("");
  window.currentRestaurant = restaurant;
  renderCart();
  document.getElementById("whatsappOrder")?.addEventListener("click", sendOrder);
}

function addToCart(productId) {
  const product = window.currentRestaurant.menu.find(p => p.id === productId);
  if (!product || !product.price) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  renderCart();
}

function changeQty(productId, amount) {
  const item = cart.find(p => p.id === productId);
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter(p => p.id !== productId);
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  const badge = document.getElementById("cartBadge");
  const totalEl = document.getElementById("cartTotal");
  const orderBtn = document.getElementById("whatsappOrder");
  if (!container) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  if (badge) badge.textContent = count;
  if (totalEl) totalEl.textContent = money(total);
  if (orderBtn) orderBtn.disabled = cart.length === 0;
  if (!cart.length) {
    container.innerHTML = `<div class="empty-cart">Tu carrito está vacío.<br>Agrega productos de la carta.</div>`;
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div class="cart-row-top"><span class="cart-row-name">${escapeHtml(item.name)}</span><span class="cart-row-price">${money(item.price * item.qty)}</span></div>
      <div class="cart-controls"><button onclick="changeQty(${item.id}, -1)" aria-label="Restar">−</button><span>${item.qty}</span><button onclick="changeQty(${item.id}, 1)" aria-label="Sumar">+</button></div>
    </div>
  `).join("");
}

function sendOrder() {
  if (!window.currentRestaurant || !cart.length) return;
  const lines = cart.map(item => `• ${item.qty} x ${item.name} — ${money(item.price * item.qty)}`);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const message = ["Hola Domiflash, quiero hacer un pedido.", "", `Restaurante: ${window.currentRestaurant.name}`, ...lines, "", `TOTAL: ${money(total)}`].join("\n");
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

function initOrderBuilderPage() {
  const listEl = document.getElementById("orderRestaurantList");
  if (!listEl) return;
  const search = document.getElementById("orderRestaurantSearch");
  const countEl = document.getElementById("selectedRestaurantCount");
  const badge = document.getElementById("orderBadge");
  const summary = document.getElementById("selectedRestaurantSummary");
  const otherCheck = document.getElementById("otherCheck");
  const otherRequest = document.getElementById("otherRequest");
  const sendBtn = document.getElementById("sendCustomOrder");
  const notes = document.getElementById("orderNotes");
  const modal = document.getElementById("restaurantMenuModal");
  const modalName = document.getElementById("modalRestaurantName");
  const modalProducts = document.getElementById("modalMenuProducts");
  const modalTotal = document.getElementById("modalRestaurantTotal");
  const confirmBtn = document.getElementById("confirmRestaurantOrder");
  const closeBtn = document.getElementById("closeMenuModal");
  const selected = new Map();
  let activeRestaurant = null;
  let draftItems = new Map();
  const money = value => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value) || 0);
  const getRestaurants = () => Array.isArray(window.RESTAURANTS) ? window.RESTAURANTS : [];
  function getRestaurant(id) { return getRestaurants().find(r => String(r.id) === String(id)); }
  function getItemsTotal(items) { return [...items.values()].reduce((total, item) => total + ((Number(item.product.price) || 0) * item.qty), 0); }
  function getGrandTotal() { let total = 0; selected.forEach(order => { total += getItemsTotal(new Map(order.items.map(item => [item.product.id, item]))); }); return total; }
  function openRestaurantMenu(restaurant) {
    activeRestaurant = restaurant; draftItems = new Map();
    const previous = selected.get(restaurant.id);
    if (previous) previous.items.forEach(item => draftItems.set(item.product.id, { product: item.product, qty: item.qty }));
    modalName.textContent = restaurant.name; renderModalProducts(); modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open");
  }
  function closeRestaurantMenu() { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); activeRestaurant = null; }
  function renderModalProducts() {
    const products = Array.isArray(activeRestaurant?.menu) ? activeRestaurant.menu : [];
    if (!products.length) { modalProducts.innerHTML = `<div class="empty-cart">Este restaurante todavía no tiene productos cargados.</div>`; modalTotal.textContent = money(0); return; }
    modalProducts.innerHTML = products.map(product => {
      const current = draftItems.get(product.id); const qty = current?.qty || 0;
      return `<article class="modal-product-card ${qty ? "has-quantity" : ""}"><div class="modal-product-info"><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description || "Producto disponible en la carta.")}</p><strong>${money(product.price)}</strong></div><div class="quantity-control" aria-label="Cantidad de ${escapeHtml(product.name)}"><button type="button" class="qty-btn" data-qty="-1" data-product-id="${product.id}" ${qty === 0 ? "disabled" : ""}>−</button><span>${qty}</span><button type="button" class="qty-btn" data-qty="1" data-product-id="${product.id}">+</button></div></article>`;
    }).join("");
    modalTotal.textContent = money(getItemsTotal(draftItems));
    modalProducts.querySelectorAll(".qty-btn").forEach(button => button.addEventListener("click", () => {
      const product = products.find(p => String(p.id) === String(button.dataset.productId)); if (!product) return;
      const delta = Number(button.dataset.qty); const current = draftItems.get(product.id)?.qty || 0; const next = Math.max(0, current + delta);
      if (next === 0) draftItems.delete(product.id); else draftItems.set(product.id, { product, qty: next }); renderModalProducts();
    }));
  }
  function render(filter = "") {
    const term = String(filter || "").trim().toLocaleLowerCase("es");
    const visible = getRestaurants().filter(r => String(r.name || "").toLocaleLowerCase("es").includes(term));
    if (!visible.length) { listEl.innerHTML = `<div class="empty-cart">No encontramos ese restaurante.</div>`; return; }
    listEl.innerHTML = visible.map(r => {
      const order = selected.get(r.id); const qty = order ? order.items.reduce((sum, item) => sum + item.qty, 0) : 0;
      return `<button type="button" class="restaurant-order-card ${order ? "confirmed" : ""}" data-restaurant-id="${r.id}"><span class="restaurant-order-check">${order ? "✓" : "+"}</span><span class="restaurant-order-content"><strong>${escapeHtml(r.name)}</strong><small>${order ? `${qty} producto${qty === 1 ? "" : "s"} seleccionado${qty === 1 ? "" : "s"}` : "Toca para abrir la carta"}</small></span><span class="restaurant-order-arrow">›</span></button>`;
    }).join("");
    listEl.querySelectorAll(".restaurant-order-card").forEach(button => button.addEventListener("click", () => { const restaurant = getRestaurant(button.dataset.restaurantId); if (restaurant) openRestaurantMenu(restaurant); }));
  }
  function renderSummary() {
    const orders = [...selected.values()]; const otherActive = !!otherCheck?.checked; const otherText = otherRequest?.value.trim() || ""; const restaurantCount = orders.length;
    if (countEl) countEl.textContent = `${restaurantCount} seleccionado${restaurantCount === 1 ? "" : "s"}`;
    const totalProducts = orders.reduce((sum, order) => sum + order.items.reduce((s, item) => s + item.qty, 0), 0);
    if (badge) badge.textContent = totalProducts + (otherActive ? 1 : 0);
    if (sendBtn) sendBtn.disabled = restaurantCount === 0 && !(otherActive && otherText);
    if (!orders.length && !otherActive) { summary.innerHTML = `<div class="empty-cart">Aún no has seleccionado restaurantes.<br>Toca un restaurante para abrir su carta.</div>`; return; }
    summary.innerHTML = orders.map(order => {
      const total = getItemsTotal(new Map(order.items.map(item => [item.product.id, item]))); const itemsText = order.items.map(item => `${item.qty}× ${escapeHtml(item.product.name)}`).join(" · ");
      return `<button type="button" class="selected-restaurant-row selected-row-button" data-summary-id="${order.restaurant.id}"><span class="selected-dot">✓</span><strong>${escapeHtml(order.restaurant.name)}</strong><small>${itemsText}</small><em>${money(total)}</em></button>`;
    }).join("") + (otherActive ? `<div class="selected-restaurant-row other-summary"><span class="selected-dot">+</span><strong>Otro</strong><small>${escapeHtml(otherText || "Describe lo que deseas agregar.")}</small></div>` : "");
    summary.querySelectorAll("[data-summary-id]").forEach(button => button.addEventListener("click", () => { const restaurant = getRestaurant(button.dataset.summaryId); if (restaurant) openRestaurantMenu(restaurant); }));
    const totalEl = document.getElementById("orderGrandTotal"); if (totalEl) totalEl.textContent = money(getGrandTotal());
  }
  function confirmActiveRestaurant() {
    if (!activeRestaurant) return; const items = [...draftItems.values()].filter(item => item.qty > 0);
    if (!items.length) selected.delete(activeRestaurant.id); else selected.set(activeRestaurant.id, { restaurant: activeRestaurant, items });
    closeRestaurantMenu(); render(search?.value || ""); renderSummary();
  }
  otherCheck?.addEventListener("change", () => { otherRequest.disabled = !otherCheck.checked; if (!otherCheck.checked) otherRequest.value = ""; renderSummary(); });
  otherRequest?.addEventListener("input", renderSummary); notes?.addEventListener("input", renderSummary); search?.addEventListener("input", e => render(e.target.value));
  closeBtn?.addEventListener("click", closeRestaurantMenu); modal?.querySelector("[data-close-menu]")?.addEventListener("click", closeRestaurantMenu); confirmBtn?.addEventListener("click", confirmActiveRestaurant);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal?.classList.contains("is-open")) closeRestaurantMenu(); });
  sendBtn?.addEventListener("click", () => {
    const orders = [...selected.values()];
    const lines = ["Hola Domiflash, quiero armar un pedido con varios restaurantes.", ""];
    if (orders.length) {
      lines.push("PEDIDO POR RESTAURANTE:");
      orders.forEach(order => {
        lines.push("", `📍 ${order.restaurant.name}`);
        order.items.forEach(item => { const subtotal = (Number(item.product.price) || 0) * item.qty; lines.push(`• ${item.qty}× ${item.product.name} — ${money(subtotal)}`); lines.push(`  Ingredientes: ${item.product.description || "No especificados"}`); });
        lines.push(`Subtotal: ${money(getItemsTotal(new Map(order.items.map(item => [item.product.id, item]))))}`);
      });
    }
    if (otherCheck?.checked && otherRequest?.value.trim()) lines.push("", "OTRO:", `• ${otherRequest.value.trim()}`);
    if (notes?.value.trim()) lines.push("", "NOTAS:", notes.value.trim());
    lines.push("", `TOTAL DE PRODUCTOS: ${money(getGrandTotal())}`, "", "Por favor ayúdenme a confirmar disponibilidad, precios y el valor del domicilio.");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
  render(); renderSummary();
}

/* =========================================
   PUBLICIDAD DE INICIO
   ========================================= */
function initHomeAdPopup() {
  const isHome = window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html") || window.location.pathname === "";
  if (!isHome || !document.body) return;
  if (document.getElementById("domiflashAdPopup")) return;

  const style = document.createElement("style");
  style.textContent = `
    .domiflash-ad-overlay{position:fixed;inset:0;z-index:99990;background:rgba(0,0,0,.78);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:22px;opacity:0;visibility:hidden;transition:opacity .35s ease,visibility .35s ease}
    .domiflash-ad-overlay.is-open{opacity:1;visibility:visible}
    .domiflash-ad-card{position:relative;width:min(560px,92vw);max-height:calc(100vh - 44px);border-radius:22px;overflow:hidden;background:#080808;box-shadow:0 24px 80px rgba(0,0,0,.65);transform:translateY(18px) scale(.97);transition:transform .35s ease;border:1px solid rgba(255,179,0,.35)}
    .domiflash-ad-overlay.is-open .domiflash-ad-card{transform:translateY(0) scale(1)}
    .domiflash-ad-image{display:block;width:100%;height:auto;max-height:calc(100vh - 44px);object-fit:contain}
    .domiflash-ad-close{position:absolute;right:10px;top:10px;width:42px;height:42px;border:1px solid rgba(255,255,255,.8);border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-size:27px;line-height:1;display:grid;place-items:center;cursor:pointer;z-index:2;transition:transform .2s ease,background .2s ease}
    .domiflash-ad-close:hover{transform:scale(1.06);background:#111}
    .domiflash-ad-close:focus-visible{outline:2px solid #ffb300;outline-offset:3px}
    body.domiflash-ad-open{overflow:hidden}
    @media(max-width:600px){.domiflash-ad-overlay{padding:14px}.domiflash-ad-card{width:min(94vw,520px);border-radius:17px;max-height:calc(100vh - 28px)}.domiflash-ad-image{max-height:calc(100vh - 28px)}.domiflash-ad-close{width:38px;height:38px;right:8px;top:8px;font-size:24px}}
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.id = "domiflashAdPopup";
  overlay.className = "domiflash-ad-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="domiflash-ad-card" role="dialog" aria-modal="true" aria-label="Publicidad Domiflash">
      <button class="domiflash-ad-close" type="button" aria-label="Cerrar publicidad">×</button>
      <img class="domiflash-ad-image" src="assets/images/Prueba Banner publicitario.png" alt="Publicidad Domiflash: Tú pides, nosotros lo llevamos">
    </div>
  `;
  document.body.appendChild(overlay);

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("domiflash-ad-open");
  };
  overlay.querySelector(".domiflash-ad-close")?.addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && overlay.classList.contains("is-open")) close(); });

  const show = () => {
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("domiflash-ad-open");
  };

  const loader = document.getElementById("domiflashLoader");
  if (loader) {
    const waitForLoader = () => {
      if (loader.classList.contains("hidden")) show();
      else setTimeout(waitForLoader, 80);
    };
    setTimeout(waitForLoader, 100);
  } else {
    setTimeout(show, 250);
  }
}

/* =========================================
   VOLVER AL INICIO EN LA PARTE SUPERIOR
   ========================================= */
function initTopBackLink() {
  const path = window.location.pathname.toLowerCase();
  const isHome = path.endsWith("/") || path.endsWith("index.html") || path === "";
  if (isHome) return;

  const existing = document.querySelector("main .back-link");
  const pedidoPage = !!document.getElementById("orderRestaurantList");
  const commercePage = !!document.querySelector("main.commerce-page .back-link");

  if (existing) {
    existing.href = "index.html";
    existing.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg><span>Volver al inicio</span>';
    if (pedidoPage || commercePage) return;
    if (existing.closest(".form-actions")) existing.remove();
    else return;
  }

  if (pedidoPage || commercePage) return;

  const link = document.createElement("a");
  link.className = "back-link icon-button";
  link.href = "index.html";
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg><span>Volver al inicio</span>';

  const main = document.querySelector("main");
  if (!main) return;

  if (main.classList.contains("form-page")) {
    main.style.position = "relative";
    link.style.position = "absolute";
    link.style.top = "55px";
    link.style.left = "max(4vw, 20px)";
    main.insertBefore(link, main.firstChild);
  } else {
    main.insertBefore(link, main.firstChild);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initRestaurantsPage();
  initMenuPage();
  initOrderBuilderPage();
  initHomeAdPopup();
  initTopBackLink();
});
