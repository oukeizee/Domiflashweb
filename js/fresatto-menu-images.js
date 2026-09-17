(function(){
  const FRESATTO_ID="3";
  const DISH_IMAGES={
    "Oblea Tradicional":"https://img0.didiglobal.com/static/soda_public/do1_t5UBZNJmVMkNTr23yDvt",
    "Oblea Especial":"https://www.gettyimages.com/",
    "Oblatto":"https://img0.didiglobal.com/static/soda_public/do1_3qXIKxerAK3L9L8dpPvp",
    "ChocoFresatto":"https://www.flowerstocolombia.com/cdn/shop/files/703-46-2.jpg?v=1725482010&width=533",
    "ChocoBowl":"https://img0.didiglobal.com/static/soda_public/do1_eGu1X2khAsmUyILLNXuq",
    "Ensalada de Frutas":"https://img0.didiglobal.com/static/soda_public/do1_H7FNuLJlIScSsMQ7n8bQ",
    "Fresas con Crema":"https://images.aws.nestle.recipes/resized/7bf7f0e6d29d285e260b0246ad22a8e6_strawberries_with_cream_new_1080_850.jpg",
    "Quesudita":"https://3.bp.blogspot.com/-7wlP8MwRdKY/WfCze-Q7jnI/AAAAAAAAIqg/5_gRXqs5YGYinu7HYPMocA8GPBZ4uf0BACLcBGAs/w1684-h1069-p-k-no-nu/oblea_de_fresa_lg.jpg",
    "Heladita":"https://media.a24.com/p/ac50a67db2a76de60ae21d162b4c0960/adjuntos/296/imagenes/007/920/0007920051/helado-3.jpeg",
    "Mini Donas":"https://mogujatosama.rs/sites/default/files/images/249f2367fc462c819fc310285abd4146_large.jpg",
    "Mini Pancakes":"https://tb-static.uber.com/prod/image-proc/processed_images/a0a274e9cd3a89222bd106c7cd443cf0/f0d1762b91fd823a1aa9bd0dab5c648d.jpeg",
    "Bowl Frutal":"https://img0.didiglobal.com/static/soda_public/do1_H7FNuLJlIScSsMQ7n8bQ",
    "Postre en Vaso":"https://lirp.cdn-website.com/fc8fbf6b/dms3rep/multi/opt/Captura%2Bde%2Bpantalla%2B2023-08-01%2B143936-1920w.png",
    "Cremosos":"https://lirp.cdn-website.com/fc8fbf6b/dms3rep/multi/opt/Captura%2Bde%2Bpantalla%2B2023-08-01%2B143936-1920w.png",
    "Jugo":"https://d31f1ehqijlcua.cloudfront.net/n/e/0/c/3/e0c3cdbbf3c2014ebd4213ebbb4aa9d90a3c5ff2_Beverages_508304_04.jpg",
    "Granizado":"https://mixies.com.co/storage/2025/03/Granizado-mixies-maracuya.jpg",
    "Milo":"https://makanhub.my/images/items/bv9iced-milo-johnnys-restaurant.webp",
    "Botella de agua":"https://walmarthn.vtexassets.com/arquivos/ids/673427/3377_02.jpg?v=638864823944200000",
    "Botella de agua con gas":"https://mistiendas.com.co/16072-large_default/agua-brisa-con-gas-x600ml.jpg"
  };
  function isFresatto(){const id=new URLSearchParams(location.search).get("id");return String(id||"")===FRESATTO_ID||String(window.currentRestaurant?.id||"")===FRESATTO_ID||String(window.currentRestaurant?.name||"").toLowerCase()==="fresatto";}
  function addStyles(){if(document.getElementById("fresattoVisualMenuStyles"))return;const style=document.createElement("style");style.id="fresattoVisualMenuStyles";style.textContent=`
    .menu-page.fresatto-visual-menu .menu-grid .menu-item{position:relative;overflow:hidden;min-height:214px;isolation:isolate;background:#0d0d0d;border-color:rgba(255,255,255,.09)}
    .menu-page.fresatto-visual-menu .menu-grid .menu-item::before{content:"";position:absolute;inset:0;z-index:-2;background-image:var(--fresatto-dish-image);background-size:cover;background-position:center;opacity:.62;transform:scale(1.03)}
    .menu-page.fresatto-visual-menu .menu-grid .menu-item::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(5,5,5,.98) 0%,rgba(5,5,5,.86) 43%,rgba(5,5,5,.40) 78%,rgba(5,5,5,.58) 100%),linear-gradient(180deg,rgba(5,5,5,.18) 0%,rgba(5,5,5,.08) 52%,rgba(5,5,5,.72) 100%)}
    .menu-page.fresatto-visual-menu .menu-grid .menu-item h3,.menu-page.fresatto-visual-menu .menu-grid .menu-item p,.menu-page.fresatto-visual-menu .menu-grid .menu-item .menu-price,.menu-page.fresatto-visual-menu .menu-grid .menu-item .menu-add{position:relative;z-index:2}
    .menu-page.fresatto-visual-menu .menu-grid .menu-item p{color:#bdbdbd}
    .menu-page.fresatto-visual-menu .menu-grid .menu-item .menu-add{box-shadow:0 10px 28px rgba(255,170,0,.16)}
    @media(max-width:600px){.menu-page.fresatto-visual-menu .menu-grid .menu-item{min-height:220px}}
  `;document.head.appendChild(style)}
  function apply(){if(!isFresatto())return;const grid=document.getElementById("menuGrid");if(!grid)return;addStyles();document.querySelector(".menu-page")?.classList.add("fresatto-visual-menu");grid.querySelectorAll(".menu-item").forEach(card=>{const title=card.querySelector("h3")?.textContent?.trim();const image=DISH_IMAGES[title];if(image)card.style.setProperty("--fresatto-dish-image",`url(\"${image}\")`);});}
  function init(){apply();const grid=document.getElementById("menuGrid");if(grid){new MutationObserver(apply).observe(grid,{childList:true,subtree:true})}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
