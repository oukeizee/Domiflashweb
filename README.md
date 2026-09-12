# Domiflash Web

Sitio web estático preparado para GitHub Pages.

## Estructura

- `index.html` — inicio.
- `restaurantes.html` — listado y buscador de restaurantes.
- `restaurante.html?id=1` — carta y carrito de un restaurante.
- `data/restaurants.js` — **archivo principal para completar las cartas y precios**.
- `css/style.css` — diseño, responsive y animaciones.
- `js/script.js` — buscador, carrito y generación del pedido por WhatsApp.
- `assets/images/` — imágenes de la identidad visual.

## Cómo agregar una carta

Abre `data/restaurants.js`. Cada restaurante tiene un arreglo `menu`.

Ejemplo:

```js
{
  id: 1,
  name: "Junior Pizza",
  menu: [
    {
      id: 1,
      name: "Pizza Hawaiana",
      description: "Jamón, piña y queso.",
      price: 25000
    },
    {
      id: 2,
      name: "Pizza Especial",
      description: "Ingredientes a elección.",
      price: 32000
    }
  ]
}
```

El precio debe ser un número sin puntos ni símbolos. El sitio lo mostrará automáticamente en pesos colombianos.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos manteniendo las carpetas.
3. En **Settings → Pages**, selecciona la rama principal (`main`) y la carpeta `/root`.
4. Guarda y espera a que GitHub publique el sitio.

## WhatsApp

El número configurado es `3184947037`.

El botón del carrito genera automáticamente un mensaje con:
- restaurante
- productos
- cantidades
- subtotal por producto
- total

## Nota

Las cartas actuales contienen un producto de ejemplo con precio `0` para dejar preparada la estructura. Reemplázalos por los productos reales cuando tengas las cartas.

La sección de restaurantes contiene los 27 nombres proporcionados y permite buscarlos.

Las tarjetas de restaurantes incluyen un borde eléctrico animado amarillo, inspirado en la referencia visual de Domiflash.

### Pedido multi-restaurante
La opción **Arma tu pedido** permite seleccionar varios restaurantes en un mismo pedido y agregar un campo **Otro** para solicitudes que no estén en las cartas. La selección se envía a Domiflash por WhatsApp para confirmar disponibilidad, precios y domicilio.

### Cartas de demostración
Cada restaurante incluye 5 productos de ejemplo con nombre, ingredientes y precio en pesos colombianos. Estos datos son provisionales y pueden reemplazarse cuando se reciban las cartas reales.

### Pantalla de carga
Todas las páginas incluyen una pantalla de carga Domiflash con porcentaje, barra de progreso y una moto animada que avanza mientras carga. También aparece brevemente al navegar entre páginas internas.


### Diseño responsive universal
La interfaz fue reforzada para adaptarse a teléfonos Android/iPhone, tablets/iPad, laptops, computadores de escritorio, pantallas grandes y orientación horizontal. Incluye soporte para safe-area/notch de iOS y controles táctiles.



## V34
- Restaurada la configuración completa de la versión anterior: 27 restaurantes, 5 productos demo por restaurante, cartas, pedido multi-restaurante, Comercios, WhatsApp, redes y responsive.
- Eliminado completamente el loader de todas las páginas.
- No se incorporaron las animaciones premium de V29.
