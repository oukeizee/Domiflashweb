(function(){
  const BASE_SCRIPT="js/script-base.js";
  const CUSTOM_SCRIPT="js/product-configurator.js";
  const OPEN_HOUR=10;
  const CLOSE_HOUR=22;
  const FRESATTO_NAME="Fresatto";
  const FRESATTO_OPEN_HOUR=2;
  const FRESATTO_CLOSE_HOUR=24;

  function isRestaurantOpenNow(){const now=new Date();const day=now.getDay();const hour=now.getHours()+(now.getMinutes()/60);return day!==0&&hour>=OPEN_HOUR&&hour<CLOSE_HOUR;}
  function isFresattoCard(card){return String(card?.textContent||"").toLocaleLowerCase("es").includes(FRESATTO_NAME.toLocaleLowerCase("es"));}
  function isFresattoMenu(){return String(window.currentRestaurant?.name||"").toLocaleLowerCase("es")===FRESATTO_NAME.toLocaleLowerCase("es");}
  function isFresattoOpenNow(){const now=new Date();const day=now.getDay();const hour=now.getHours()+(now.getMinutes()/60);return day!==0&&hour>=FRESATTO_OPEN_HOUR&&hour<FRESATTO_CLOSE_HOUR;}
  function closedLabel(){return '<span class="closed-badge">Cerrado ahora</span>';}
  function applyClosedState(){
    const globalOpen=isRestaurantOpenNow();
    const fresattoOpen=isFresattoOpenNow();
    document.querySelectorAll('.restaurant-card').forEach(card=>{const button=card.querySelector('.restaurant-name-button');if(!button)return;const open=isFresattoCard(card)?fresattoOpen:globalOpen;card.classList.toggle('is-closed',!open);button.classList.toggle('is-closed',!open);button.disabled=!open;button.setAttribute('aria-disabled',String(!open));if(!open){button.setAttribute('title','Este restaurante está cerrado');if(!card.querySelector('.closed-badge')){const number=card.querySelector('.restaurant-number');if(number)number.insertAdjacentHTML('afterend',closedLabel());}}else{button.removeAttribute('title');card.querySelector('.closed-badge')?.remove();}});
    document.querySelectorAll('.restaurant-order-card').forEach(card=>{const open=isFresattoCard(card)?fresattoOpen:globalOpen;card.classList.toggle('is-closed',!open);card.disabled=!open;card.setAttribute('aria-disabled',String(!open));if(!open)card.setAttribute('title','Este restaurante está cerrado');else card.removeAttribute('title');});
    document.querySelectorAll('.menu-add').forEach(button=>{if(button.dataset.closedBaseLabel===undefined)button.dataset.closedBaseLabel=button.textContent.trim();const open=isFresattoMenu()?fresattoOpen:globalOpen;button.disabled=!open;if(!open){button.textContent='Restaurante cerrado';button.setAttribute('title','Este restaurante está cerrado');}else{button.textContent=button.dataset.closedBaseLabel;button.removeAttribute('title');}});
  }
  function renderDirectoryFallback(filter=""){
    const grid=document.getElementById("restaurantGrid"),restaurants=Array.isArray(window.RESTAURANT_DIRECTORY)?window.RESTAURANT_DIRECTORY:[];if(!grid||!restaurants.length)return;
    const term=String(filter||"").trim().toLocaleLowerCase("es"),list=restaurants.filter(r=>String(r.name||"").toLocaleLowerCase("es").includes(term));const count=document.getElementById("restaurantCount");if(count)count.textContent=`${list.length} restaurante${list.length===1?"":"s"}`;
    const schedule=window.RESTAURANT_DIRECTORY_SCHEDULE;const scheduleHtml=schedule?`<div class="restaurant-schedule" aria-label="Horario de atención"><div class="restaurant-schedule-title"><span>Horario</span><span class="restaurant-schedule-time">${schedule.open} – ${schedule.close}</span></div><div class="schedule-days" aria-label="Días de servicio">${(schedule.days||[]).map(day=>`<span class="schedule-day ${day.open?"open":"closed"}" title="${day.name}: ${day.open?`${schedule.open} – ${schedule.close}`:"Cerrado"}">${day.label}</span>`).join("")}</div><p class="restaurant-schedule-closed"><strong>Cierre:</strong> ${(schedule.closedDays||[]).join(", ")}</p></div>`:"";
    if(!list.length){grid.innerHTML=`<div class="empty-cart restaurant-empty" style="grid-column:1/-1">No encontramos ese restaurante.</div>`;return;}
    const safe=value=>{const div=document.createElement("div");div.textContent=value==null?"":String(value);return div.innerHTML;};grid.innerHTML=list.map((r,index)=>`<article class="restaurant-card reveal" style="animation-delay:${Math.min(index*.025,.35)}s"><div><span class="restaurant-number">${String(r.id).padStart(2,"0")}</span></div><button class="restaurant-name-button" type="button" onclick="window.location.href='restaurante.html?id=${encodeURIComponent(r.id)}'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7M3.5 3v5a2.5 2.5 0 0 0 5 0V3M6 10.5V21M17 3v18M17 3c2.2 1.7 3.5 4.2 3.5 7v1H17"/></svg><span>${safe(r.name)}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button>${scheduleHtml}</article>`).join("");applyClosedState();
  }
  function initRestaurantsFallback(){const grid=document.getElementById("restaurantGrid");if(!grid||!Array.isArray(window.RESTAURANT_DIRECTORY))return;if(!grid.children.length)renderDirectoryFallback();const search=document.getElementById("restaurantSearch");if(search&&!search.dataset.directoryFallbackBound){search.dataset.directoryFallbackBound="1";search.addEventListener("input",e=>renderDirectoryFallback(e.target.value));}}
  function startClosedState(){const run=()=>{applyClosedState();const observer=new MutationObserver(()=>applyClosedState());observer.observe(document.body,{childList:true,subtree:true});setInterval(applyClosedState,30000);};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();}
  function initBasePage(){if(typeof initRestaurantsPage==='function')initRestaurantsPage();if(typeof initMenuPage==='function')initMenuPage();if(typeof initOrderBuilderPage==='function')initOrderBuilderPage();if(typeof initHomeAdPopup==='function')initHomeAdPopup();if(typeof initTopBackLink==='function')initTopBackLink();initRestaurantsFallback();startClosedState();}
  function loadScript(src,onload){const script=document.createElement('script');script.src=src;script.onload=onload;script.onerror=()=>console.error(`No se pudo cargar ${src}`);document.head.appendChild(script);}
  function loadCatalogData(next){const needsCatalog=!!document.getElementById("menuGrid")||!!document.getElementById("orderRestaurantList");if(!needsCatalog){next();return;}loadScript("data/restaurants.js",()=>loadScript("data/fresatto-menu.js",next));}
  function loadConfiguratorStyles(){if(!document.getElementById("productConfiguratorStyles")){const link=document.createElement("link");link.id="productConfiguratorStyles";link.rel="stylesheet";link.href="css/product-configurator.css";document.head.appendChild(link);}}
  function loadCustomScript(){loadConfiguratorStyles();loadScript(CUSTOM_SCRIPT,()=>{initBasePage();setTimeout(initRestaurantsFallback,250);});}
  function loadBaseScript(){loadScript(BASE_SCRIPT,loadCustomScript);}
  loadCatalogData(loadBaseScript);
})();
