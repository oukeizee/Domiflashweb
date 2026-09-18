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

/*
 * Logos entregados por el cliente.
 * Los nombres de archivo se conservan para poder sustituirlos
 * fácilmente en el futuro sin tocar la estructura del directorio.
 */
window.RESTAURANT_LOGOS = {
  1: "Junior Pizza.jpg",
  2: "Donipanda Baeery.jpg",
  3: "Fresatto.jpg",
  4: "Chorizos donde Juancho.jpg",
  5: "La Brasa China de la 40.jpg",
  6: "Pantera.jpg",
  7: "Panaderia Duble.jpg",
  8: "Chica Fresa.jpg",
  9: "Mylú.jpg",
  10: "Mr. Chiken.jpg",
  11: "Fruty Cream.jpg",
  12: "Aramex.jpg",
  13: "Pizzas Rapidas Country´s.jpg",
  14: "Chamos Cholados.jpg",
  15: "La Bonga.jpg",
  16: "Espuela.jpg",
  17: "Chalo.jpg",
  18: "Burger City.jpg",
  19: "Barto.jpg",
  20: "La Magola.jpg",
  21: "Cherramy Heladeria.jpg",
  22: "Sabor al Barril.jpg",
  23: "Asadero de Pollo alto la 16.jpg",
  24: "El Camarón.jpg",
  25: "Don Grizzly Hamburguesas.jpg",
  26: "La Casa de la Hamburguesa.jpg",
  27: "Mapple.jpg"
};

(function(){
  const LOGO_DIR = "assets/images/logos/";

  function logoUrl(id){
    const filename = window.RESTAURANT_LOGOS?.[String(id)] || window.RESTAURANT_LOGOS?.[id];
    return filename ? LOGO_DIR + encodeURIComponent(filename) : "";
  }

  function addLogos(){
    document.querySelectorAll("#restaurantGrid .restaurant-card").forEach(card => {
      const id = String(card.dataset?.restaurantId || "").trim();
      const src = logoUrl(id);
      const nameButton = card.querySelector(".restaurant-name-button");
      if(!src || !nameButton) return;

      let img = card.querySelector(".restaurant-card-logo");
      if(!img){
        img = document.createElement("img");
        img.className = "restaurant-card-logo";
        img.decoding = "async";
        img.loading = "eager";
        img.width = 78;
        img.height = 78;
        card.insertBefore(img, nameButton);
      }

      if(img.src !== new URL(src, document.baseURI).href){
        img.src = src;
      }

      const restaurant = window.RESTAURANT_DIRECTORY?.find(r => String(r.id) === id);
      img.alt = restaurant ? `Logo de ${restaurant.name}` : "Logo del restaurante";
    });
  }

  function addStyles(){
    if(document.getElementById("restaurantLogoStyles")) return;
    const style = document.createElement("style");
    style.id = "restaurantLogoStyles";
    style.textContent = `
      .restaurant-card:has(.restaurant-card-logo){
        position:relative;
        min-height:255px;
      }

      .restaurant-card .restaurant-card-logo{
        position:absolute;
        left:25px;
        top:45px;
        width:78px !important;
        height:78px !important;
        max-width:78px !important;
        min-width:78px !important;
        object-fit:contain !important;
        object-position:center;
        border-radius:50%;
        margin:0;
        padding:0;
        border:1px solid rgba(255,255,255,.42);
        box-shadow:
          0 0 0 2px rgba(5,5,5,.9),
          0 8px 20px rgba(0,0,0,.38);
        background:#050505;
        opacity:1 !important;
        visibility:visible !important;
        z-index:2;
      }

      .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{
        width:calc(100% - 98px);
        margin-left:98px;
        margin-top:18px;
        min-height:52px;
      }

      .restaurant-card:has(.restaurant-card-logo) .restaurant-schedule{
        position:relative;
        z-index:3;
        margin-top:14px;
      }

      @media(max-width:600px){
        .restaurant-card:has(.restaurant-card-logo){
          min-height:248px;
        }

        .restaurant-card .restaurant-card-logo{
          left:20px;
          top:45px;
          width:68px !important;
          height:68px !important;
          max-width:68px !important;
          min-width:68px !important;
        }

        .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{
          width:calc(100% - 86px);
          margin-left:86px;
          margin-top:18px;
          min-height:46px;
        }

        .restaurant-card:has(.restaurant-card-logo) .restaurant-schedule{
          margin-top:12px;
        }
      }

      @media(max-width:380px){
        .restaurant-card:has(.restaurant-card-logo){
          min-height:242px;
        }

        .restaurant-card .restaurant-card-logo{
          left:18px;
          top:44px;
          width:60px !important;
          height:60px !important;
          max-width:60px !important;
          min-width:60px !important;
        }

        .restaurant-card:has(.restaurant-card-logo) .restaurant-name-button{
          width:calc(100% - 76px);
          margin-left:76px;
        }
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

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",init,{once:true});
  } else {
    init();
  }
})();
