/* =========================================
   DIRECTORIO PÚBLICO DE RESTAURANTES
   -----------------------------------------
   Este archivo pertenece ÚNICAMENTE a la página
   "Restaurantes".

   No contiene las cartas ni los productos.
   La página "Arma tu pedido" utiliza su propio
   catálogo completo en data/restaurants.js.

   Para agregar un restaurante al directorio público,
   agrega solamente su id y nombre aquí.
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
  { "id": 1, "name": "Junior Pizza" },
  { "id": 2, "name": "Donipanda" },
  { "id": 3, "name": "Fresatto" },
  { "id": 4, "name": "Chorizos el Juancho" },
  { "id": 5, "name": "La brasa china" },
  { "id": 6, "name": "Pantera" },
  { "id": 7, "name": "Panadería" },
  { "id": 8, "name": "Chica Fresa" },
  { "id": 9, "name": "Mylu" },
  { "id": 10, "name": "Mr. Chiken" },
  { "id": 11, "name": "Fruty Cream" },
  { "id": 12, "name": "Aramex" },
  { "id": 13, "name": "Pizzas Country’S" },
  { "id": 14, "name": "Chulos cholados" },
  { "id": 15, "name": "La bonga" },
  { "id": 16, "name": "Espuela" },
  { "id": 17, "name": "Chalo" },
  { "id": 18, "name": "Burguer City" },
  { "id": 19, "name": "Barto" },
  { "id": 20, "name": "La magola" },
  { "id": 21, "name": "Cherramy Heladería" },
  { "id": 22, "name": "Sabor al barril" },
  { "id": 23, "name": "Asadero del Alto la 16" },
  { "id": 24, "name": "El camarón" },
  { "id": 25, "name": "Don Grizzly" },
  { "id": 26, "name": "La casa de la hamburguesa" },
  { "id": 27, "name": "Mapple" }
];
