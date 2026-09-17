(function(){
  const FRESATTO_ID="3";
  const DISH_IMAGES={
    "Oblea Tradicional":"https://tb-static.uber.com/prod/image-proc/processed_images/f8b1ec214eb95635b47eb7721f2826cc/268ee1a1296808aa6eae11eb597de84d.jpeg",
    "Oblea Especial":"https://assets.touch2success.com/static/fb27f225da54f1fb3842cf95fe2addd4/img/1744112660phpAnQGZ3.jpg",
    "Oblatto":"https://tb-static.uber.com/prod/image-proc/processed_images/f8b1ec214eb95635b47eb7721f2826cc/268ee1a1296808aa6eae11eb597de84d.jpeg",
    "ChocoFresatto":"https://dashanddishes.com/assets/images/1773336357630-6qcnvsht.webp",
    "ChocoBowl":"https://cms.neugebauer.com.br/storage/recipes/1598103169-Capa.jpg",
    "Ensalada de Frutas":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Fresas con Crema":"https://dashanddishes.com/assets/images/1773336357630-6qcnvsht.webp",
    "Quesudita":"https://tb-static.uber.com/prod/image-proc/processed_images/f8b1ec214eb95635b47eb7721f2826cc/268ee1a1296808aa6eae11eb597de84d.jpeg",
    "Heladita":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Mini Donas":"https://cms.neugebauer.com.br/storage/recipes/1598103169-Capa.jpg",
    "Mini Pancakes":"https://dashanddishes.com/assets/images/1773336357630-6qcnvsht.webp",
    "Bowl Frutal":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Postre en Vaso":"https://cms.neugebauer.com.br/storage/recipes/1598103169-Capa.jpg",
    "Cremosos":"https://cms.neugebauer.com.br/storage/recipes/1598103169-Capa.jpg",
    "Jugo":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Granizado":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Milo":"https://cms.neugebauer.com.br/storage/recipes/1598103169-Capa.jpg",
    "Botella de agua":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg",
    "Botella de agua con gas":"https://images.deliveryhero.io/image/talabat/MenuItems/Fruit_Salad_with_Ice_Crea638772961137599074.jpg"
  };
  function isFresatto(){const id=new URLSearchParams(location.search).get("id");return String(id||"")===FRESATTO_ID||String(window.currentRestaurant?.id||"")===FRESATTO_ID||String(window.currentRestaurant?.name||"").toLowerCase()==="fresatto";}
  function apply(){if(!isFresatto())return;const grid=document.getElementById("menuGrid");if(!grid)return;document.querySelector(".menu-page")?.classList.add("fresatto-visual-menu");grid.querySelectorAll(".menu-item").forEach(card=>{const title=card.querySelector("h3")?.textContent?.trim();const image=DISH_IMAGES[title];if(image)card.style.setProperty("--fresatto-dish-image",`url(\"${image}\")`);});}
  function init(){apply();const grid=document.getElementById("menuGrid");if(grid){new MutationObserver(apply).observe(grid,{childList:true,subtree:true});}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
