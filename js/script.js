(function(){
  const BASE_SCRIPT = "script-base.js";
  const OPEN_HOUR = 10;
  const CLOSE_HOUR = 22;

  function isRestaurantOpenNow(){
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + (now.getMinutes() / 60);
    return day !== 0 && hour >= OPEN_HOUR && hour < CLOSE_HOUR;
  }

  function closedLabel(){
    return '<span class="closed-badge">Cerrado ahora</span>';
  }

  function applyClosedState(){
    const open = isRestaurantOpenNow();

    document.querySelectorAll('.restaurant-card').forEach(card => {
      const button = card.querySelector('.restaurant-name-button');
      if (!button) return;
      card.classList.toggle('is-closed', !open);
      button.classList.toggle('is-closed', !open);
      button.disabled = !open;
      button.setAttribute('aria-disabled', String(!open));
      if (!open) {
        button.setAttribute('title', 'Este restaurante está cerrado');
        if (!card.querySelector('.closed-badge')) {
          const number = card.querySelector('.restaurant-number');
          if (number) number.insertAdjacentHTML('afterend', closedLabel());
        }
      } else {
        button.removeAttribute('title');
        card.querySelector('.closed-badge')?.remove();
      }
    });

    document.querySelectorAll('.restaurant-order-card').forEach(card => {
      card.classList.toggle('is-closed', !open);
      card.disabled = !open;
      card.setAttribute('aria-disabled', String(!open));
      if (!open) card.setAttribute('title', 'Este restaurante está cerrado');
      else card.removeAttribute('title');
    });

    document.querySelectorAll('.menu-add').forEach(button => {
      if (button.dataset.closedBaseLabel === undefined) {
        button.dataset.closedBaseLabel = button.textContent.trim();
      }
      button.disabled = !open;
      if (!open) {
        button.textContent = 'Restaurante cerrado';
        button.setAttribute('title', 'Este restaurante está cerrado');
      } else {
        button.textContent = button.dataset.closedBaseLabel;
        button.removeAttribute('title');
      }
    });
  }

  function startClosedState(){
    applyClosedState();
    const observer = new MutationObserver(() => applyClosedState());
    observer.observe(document.body, { childList:true, subtree:true });
    setInterval(applyClosedState, 30000);
  }

  function loadBaseScript(){
    const script = document.createElement('script');
    script.src = BASE_SCRIPT;
    script.onload = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startClosedState, { once:true });
      } else {
        startClosedState();
      }
    };
    script.onerror = () => console.error('No se pudo cargar el script principal de Domiflash.');
    document.head.appendChild(script);
  }

  loadBaseScript();
})();
