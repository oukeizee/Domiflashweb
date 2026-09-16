/* =========================================
   DIRECTORIO PÚBLICO DE RESTAURANTES
   -----------------------------------------
   Este archivo pertenece ÚNICAMENTE a la página
   "Restaurantes".

   No contiene las cartas ni los productos.
   La página "Arma tu pedido" utiliza su propio
   catálogo completo en data/restaurants.js.
   ========================================= */

window.RESTAURANT_DIRECTORY_SCHEDULE = {
  open: "10:00 a. m.",
  close: "10:00 p. m.",
  closedDays: ["Domingo"],
  days: [
    { label: "D", name: "Domingo", open: false },
    { label: "L", name: "Lunes", open: true },
    { label: "M", name: "Martes", open: true },
    { label: "M", name: "Miércoles", open: true },
    { label: "J", name: "Jueves", open: true },
    { label: "V", name: "Viernes", open: true },
    { label: "S", name: "Sábado", open: true }
  ]
};

window.RESTAURANT_DIRECTORY = [
  { id: 1, name: "Junior Pizza" },
  { id: 2, name: "Donipanda" },
  { id: 3, name: "Fresatto" },
  { id: 4, name: "Chorizos el Juancho" },
  { id: 5, name: "La brasa china" },
  { id: 6, name: "Pantera" },
  { id: 7, name: "Panadería" },
  { id: 8, name: "Chica Fresa" },
  { id: 9, name: "Mylu" },
  { id: 10, name: "Mr. Chiken" },
  { id: 11, name: "Fruty Cream" },
  { id: 12, name: "Aramex" },
  { id: 13, name: "Pizzas Country’S" },
  { id: 14, name: "Chulos cholados" },
  { id: 15, name: "La bonga" },
  { id: 16, name: "Espuela" },
  { id: 17, name: "Chalo" },
  { id: 18, name: "Burguer City" },
  { id: 19, name: "Barto" },
  { id: 20, name: "La magola" },
  { id: 21, name: "Cherramy Heladería" },
  { id: 22, name: "Sabor al barril" },
  { id: 23, name: "Asadero del Alto la 16" },
  { id: 24, name: "El camarón" },
  { id: 25, name: "Don Grizzly" },
  { id: 26, name: "La casa de la hamburguesa" },
  { id: 27, name: "Mapple" }
];

(function(){
  const LOGO_PATH = "assets/images/fresatto-logo-clean.svg?v=20260916-4";

  function isFresatto(card){
    if(!card) return false;
    const id = String(card.dataset?.restaurantId || "");
    const name = String(card.querySelector(".restaurant-name-button span")?.textContent || "").trim().toLocaleLowerCase("es");
    const number = String(card.querySelector(".restaurant-number")?.textContent || "").trim();
    return id === "3" || name === "fresatto" || number === "03";
  }

  function addLogo(){
    document.querySelectorAll("#restaurantGrid .restaurant-card").forEach(card => {
      if(!isFresatto(card) || card.querySelector(".fresatto-card-logo")) return;
      const numberWrap = card.querySelector(".restaurant-number")?.parentElement;
      if(!numberWrap) return;
      const img = document.createElement("img");
      img.className = "fresatto-card-logo";
      img.src = LOGO_PATH;
      img.alt = "Logo de Fresatto";
      img.decoding = "async";
      img.loading = "eager";
      img.width = 150;
      img.height = 150;
      card.insertBefore(img, numberWrap.nextSibling);
    });
  }

  function addStyles(){
    if(document.getElementById("fresattoLogoStyles")) return;
    const style = document.createElement("style");
    style.id = "fresattoLogoStyles";
    style.textContent = `
      .fresatto-card-logo{display:block!important;width:150px!important;height:150px!important;max-width:150px!important;object-fit:contain!important;object-position:center!important;border-radius:50%!important;margin:8px 0 18px!important;border:1px solid rgba(255,179,0,.55)!important;box-shadow:0 12px 28px rgba(0,0,0,.35)!important;background:#050505!important;opacity:1!important;visibility:visible!important}
      @media(max-width:560px){.fresatto-card-logo{width:118px!important;height:118px!important;max-width:118px!important;margin:6px 0 16px!important}}
    `;
    document.head.appendChild(style);
  }

  function init(){
    addStyles();
    addLogo();
    const grid = document.getElementById("restaurantGrid");
    if(grid && !grid.dataset.fresattoLogoObserver){
      grid.dataset.fresattoLogoObserver = "1";
      new MutationObserver(addLogo).observe(grid,{childList:true,subtree:true});
    }
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
