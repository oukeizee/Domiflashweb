# Domiflash — Guía técnica del código

Esta carpeta documenta la versión estable de Domiflash sin cambiar la lógica funcional del sitio.

## 1. Estructura recomendada

```text
/
├── index.html                  # Página de inicio
├── restaurantes.html           # Listado y buscador de restaurantes
├── restaurante.html            # Carta y carrito de un restaurante
├── pedido.html                 # Pedido con varios restaurantes
├── comercios.html              # Categorías de comercios/servicios
├── formulario-whatsapp.html    # Formulario de ayuda por WhatsApp
│
├── css/
│   ├── style-base.css          # Estilos generales y responsive
│   └── style.css               # Overrides específicos, incluido estado cerrado
│
├── js/
│   ├── script-base.js          # Lógica principal de la aplicación
│   └── script.js               # Cargador/orquestador y estado de locales
│
├── data/
│   └── restaurants.js          # Datos de los 27 restaurantes y sus menús
│
├── assets/images/              # Logo, banners y publicidad
│
└── docs/
    └── GUIA-CODIGO.md          # Esta documentación
```

## 2. Flujo de carga JavaScript

`script.js` carga `script-base.js`. Cuando el archivo principal termina de cargar, `initBasePage()` inicializa las funciones correspondientes a la página actual y después activa el control de horarios/cierre.

Esto es importante: el sitio no depende de que todas las páginas tengan todos los elementos. Cada inicializador comprueba si los elementos que necesita existen y, si no existen, simplemente termina.

## 3. Funciones de `js/script-base.js`

### Formato y datos

- `money(value)` — convierte un número a formato de moneda colombiana (COP).
- `getRestaurantById(id)` — busca un restaurante dentro de `window.RESTAURANTS` usando su ID.
- `escapeHtml(text)` — escapa texto antes de insertarlo en HTML para evitar que nombres/descripciones introduzcan marcado HTML.

### Página de restaurantes

- `renderRestaurants(filter)` — filtra y genera las tarjetas de restaurantes dentro de `#restaurantGrid`.
- `initRestaurantsPage()` — conecta el buscador de restaurantes con `renderRestaurants()` y realiza el primer renderizado.

### Carta y carrito individual

- `initMenuPage()` — obtiene el restaurante indicado por `?id=`, genera su carta y conecta el botón de WhatsApp.
- `addToCart(productId)` — agrega un producto al carrito o incrementa su cantidad.
- `changeQty(productId, amount)` — aumenta o disminuye la cantidad de un producto y elimina el producto cuando llega a cero.
- `renderCart()` — actualiza productos, cantidades, contador, total y estado del botón de pedido.
- `sendOrder()` — construye el mensaje del pedido individual y lo abre en WhatsApp.

### Pedido multi-restaurante

- `initOrderBuilderPage()` — inicializa toda la página `pedido.html`.
- `getRestaurant(id)` — función interna que localiza un restaurante dentro de la selección disponible.
- `getItemsTotal(items)` — calcula el subtotal de los productos de un restaurante.
- `getGrandTotal()` — calcula el total combinado de todos los restaurantes seleccionados.
- `openRestaurantMenu(restaurant)` — abre el modal de la carta y recupera una selección anterior si existe.
- `closeRestaurantMenu()` — cierra el modal y limpia el restaurante activo.
- `renderModalProducts()` — genera los productos y controles de cantidad del modal.
- `render(filter)` — genera la lista de restaurantes del constructor de pedidos y aplica el buscador.
- `renderSummary()` — actualiza el resumen, contador, productos y total del pedido multi-restaurante.
- `confirmActiveRestaurant()` — confirma la selección del restaurante activo y la guarda en el pedido.

### Navegación y extras

- `initHomeAdPopup()` — controla la ventana/publicidad de inicio y su cierre.
- `initTopBackLink()` — mantiene el enlace superior `Volver al inicio` en las páginas que lo necesitan.

## 4. Funciones de `js/script.js`

### Horarios

- `isRestaurantOpenNow()` — determina si el local está abierto según la hora actual. La configuración actual es lunes-sábado 10:00–22:00 y domingo cerrado.
- `closedLabel()` — genera la etiqueta visual `Cerrado ahora`.
- `applyClosedState()` — aplica o elimina el estado cerrado en tarjetas, botones y controles de pedido.
- `startClosedState()` — inicia el control del estado cerrado, observa cambios del DOM y vuelve a comprobarlo periódicamente.

### Inicialización

- `initBasePage()` — llama a los inicializadores disponibles del sistema y después activa `startClosedState()`.
- `loadBaseScript()` — carga `js/script-base.js` y espera a que termine para iniciar la aplicación.

## 5. Estado de restaurante cerrado

Cuando un restaurante está cerrado:

1. La tarjeta pasa a escala de grises.
2. Se reduce su opacidad.
3. Se muestra `Cerrado ahora`.
4. El botón de selección queda deshabilitado.
5. En `pedido.html` tampoco se puede abrir la carta del local.
6. En una carta individual, los botones para agregar productos quedan deshabilitados mientras el local esté cerrado.

El CSS específico está en `css/style.css`; los estilos generales permanecen en `css/style-base.css`.

## 6. Datos de restaurantes

`data/restaurants.js` contiene `window.RESTAURANTS`.

Cada objeto tiene esta estructura:

```js
{
  id: 1,
  name: "Nombre del restaurante",
  menu: [
    {
      id: 1,
      name: "Producto",
      description: "Descripción del producto",
      price: 25000
    }
  ]
}
```

Para modificar cartas o precios, este es el archivo principal que se debe editar. No es necesario modificar el HTML para cambiar los productos.

## 7. Regla importante para futuras modificaciones

Antes de modificar JavaScript, conservar la separación entre:

- `script-base.js` → lógica principal.
- `script.js` → carga/orquestación y estado de horarios.

Antes de modificar estilos, conservar:

- `style-base.css` → diseño general.
- `style.css` → ajustes específicos.

Esto reduce el riesgo de volver a romper el renderizado de la lista de restaurantes.

## 8. Versión de referencia

Código funcional de referencia: `eb4cbe721c56c63d97566f731e354471d1ffe5c0`.

Esta rama documental parte exactamente de esa versión y agrega únicamente documentación técnica.
