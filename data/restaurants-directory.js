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


/* Logos de restaurantes suministrados por Domiflash.
   Se usa un sprite optimizado para mantener el sitio liviano.
   Fresatto conserva su logo original y su implementación original. */
window.RESTAURANT_LOGO_POSITIONS = {
  1:[0,0], 2:[1,0], 4:[2,0], 5:[3,0], 6:[4,0], 7:[5,0],
  8:[0,1], 9:[1,1], 10:[2,1], 11:[3,1], 12:[4,1], 13:[5,1],
  14:[0,2], 15:[1,2], 16:[2,2], 17:[3,2], 18:[4,2], 19:[5,2],
  20:[0,3], 21:[1,3], 22:[2,3], 23:[3,3], 24:[4,3], 25:[5,3],
  26:[0,4], 27:[1,4]
};

(function(){
  const SPRITE = "assets/images/logos/restaurant-logos-sprite.jpg";
  function addLogos(){
    document.querySelectorAll("#restaurantGrid .restaurant-card").forEach(card => {
      const id = String(card.dataset?.restaurantId || "").trim();
      if(id === "3" || card.querySelector(".restaurant-card-logo")) return;
      const position = window.RESTAURANT_LOGO_POSITIONS?.[id] || window.RESTAURANT_LOGO_POSITIONS?.[Number(id)];
      const nameButton = card.querySelector(".restaurant-name-button");
      if(!position || !nameButton) return;
      const logo = document.createElement("span");
      logo.className = "restaurant-card-logo";
      logo.setAttribute("role","img");
      logo.setAttribute("aria-label","Logo del restaurante");
      logo.style.setProperty("--logo-col", String(position[0]));
      logo.style.setProperty("--logo-row", String(position[1]));
      logo.style.backgroundImage = `url("${SPRITE}")`;
      card.insertBefore(logo, nameButton);
    });
  }

  function addStyles(){
    if(document.getElementById("restaurantLogoStyles")) return;
    const style = document.createElement("style");
    style.id = "restaurantLogoStyles";
    style.textContent = `
      .restaurant-card:has(.restaurant-card-logo){position:relative;min-height:255px}
      .restaurant-card .restaurant-card-logo{
        position:absolute;left:25px;top:45px;width:70px!important;height:70px!important;
        display:block;max-width:70px!important;min-width:70px!important;
        background-size:420px 350px;
        background-repeat:no-repeat;
        background-position:calc(var(--logo-col) * -70px) calc(var(--logo-row) * -70px);
        object-fit:cover;
        border-radius:50%;
        margin:0;
        border:1px solid rgba(255,179,0,.55);
        box-shadow:0 8px 20px rgba(0,0,0,.32);
        background-color:#050505;
        opacity:1!important;
        visibility:visible!important;
        z-index:1;
      }
      .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{
        width:calc(100% - 88px);margin-left:88px;margin-top:18px;min-height:52px;
      }
      .restaurant-card:has(.restaurant-card-logo) .restaurant-schedule{position:relative;z-index:2;margin-top:14px}
      @media(max-width:600px){
        .restaurant-card:has(.restaurant-card-logo){min-height:248px}
        .restaurant-card .restaurant-card-logo{left:20px;top:45px;width:62px!important;height:62px!important;max-width:62px!important;min-width:62px!important;background-size:372px 310px;background-position:calc(var(--logo-col) * -62px) calc(var(--logo-row) * -62px)}
        .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{width:calc(100% - 78px);margin-left:78px;margin-top:18px;min-height:46px}
        .restaurant-card:has(.restaurant-card-logo) .restaurant-schedule{margin-top:12px}
      }
      @media(max-width:380px){
        .restaurant-card:has(.restaurant-card-logo){min-height:242px}
        .restaurant-card .restaurant-card-logo{left:18px;top:44px;width:56px!important;height:56px!important;max-width:56px!important;min-width:56px!important;background-size:336px 280px;background-position:calc(var(--logo-col) * -56px) calc(var(--logo-row) * -56px)}
        .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{width:calc(100% - 70px);margin-left:70px}
      }
    `;
    document.head.appendChild(style);
  }

  function init(){
    addStyles();
    addLogos();
    const grid = document.getElementById("restaurantGrid");
    if(grid && !grid.dataset.restaurantLogoObserver){
      grid.dataset.restaurantLogoObserver = "1";
      new MutationObserver(addLogos).observe(grid,{childList:true,subtree:true});
    }
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();

(function(){
  const LOGO_PATH = "assets/images/fresatto-logo-clean.svg?v=20260916-8";

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
      const nameButton = card.querySelector(".restaurant-name-button");
      if(!nameButton) return;
      const img = document.createElement("img");
      img.className = "fresatto-card-logo";
      img.src = LOGO_PATH;
      img.alt = "Logo de Fresatto";
      img.decoding = "async";
      img.loading = "eager";
      img.width = 70;
      img.height = 70;
      card.insertBefore(img, nameButton);
    });
  }

  function addStyles(){
    if(document.getElementById("fresattoLogoStyles")) return;
    const style = document.createElement("style");
    style.id = "fresattoLogoStyles";
    style.textContent = `
      .restaurant-card:has(.fresatto-card-logo){position:relative;min-height:255px}
      .restaurant-card .fresatto-card-logo{
        position:absolute;left:25px;top:45px;width:70px!important;height:70px!important;max-width:70px!important;
        object-fit:contain!important;object-position:center;border-radius:50%;margin:0;
        border:1px solid rgba(255,179,0,.55);box-shadow:0 8px 20px rgba(0,0,0,.32);
        background:#050505;opacity:1!important;visibility:visible!important;z-index:1;
      }
      .restaurant-card:has(.fresatto-card-logo) .restaurant-name-button{
        width:calc(100% - 88px);margin-left:88px;margin-top:18px;min-height:52px;
      }
      .restaurant-card:has(.fresatto-card-logo) .restaurant-schedule{position:relative;z-index:2;margin-top:14px}
      @media(max-width:600px){
        .restaurant-card:has(.fresatto-card-logo){min-height:248px}
        .restaurant-card .fresatto-card-logo{left:20px;top:45px;width:62px!important;height:62px!important;max-width:62px!important}
        .restaurant-card:has(.fresatto-card-logo) .restaurant-name-button{width:calc(100% - 78px);margin-left:78px;margin-top:18px;min-height:46px}
        .restaurant-card:has(.fresatto-card-logo) .restaurant-schedule{margin-top:12px}
      }
      @media(max-width:380px){
        .restaurant-card:has(.fresatto-card-logo){min-height:242px}
        .restaurant-card .fresatto-card-logo{left:18px;top:44px;width:56px!important;height:56px!important;max-width:56px!important}
        .restaurant-card:has(.fresatto-card-logo) .restaurant-name-button{width:calc(100% - 70px);margin-left:70px}
      }
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
