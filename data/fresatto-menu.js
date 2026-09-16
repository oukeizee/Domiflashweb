window.FRESATTO_MENU = [
  {
    id: 1, name: "Oblea Tradicional",
    description: "Arequipe, queso y 1 topping a elección.",
    price: 5000,
    customization: {
      steps: [
        { id:"topping", title:"Elige 1 topping", type:"single", required:true,
          choices:["Maní","Grajeas","Oreo","Coco","Chocokrispi","Granola"] }
      ]
    }
  },
  {
    id: 2, name: "Oblea Especial",
    description: "Arequipe, fresa picada o banano, crema de la casa, 1 topping y 1 base.",
    price: 10000,
    customization: {
      steps: [
        { id:"fruta", title:"Elige la fruta", type:"single", required:true, choices:["Fresa picada","Banano"] },
        { id:"topping", title:"Elige 1 topping", type:"single", required:true,
          choices:["Maní","Grajeas","Oreo","Coco","Chocokrispi","Granola"] },
        { id:"base", title:"Elige 1 base", type:"single", required:true,
          choices:["Arequipe","Leche condensada","Mora"] }
      ]
    }
  },
  {
    id: 3, name: "Obleatto",
    description: "Crema fresa, banano, oblea, arequipe, oblea en triángulos, dulce de mora, queso y más arequipe.",
    price: 24000
  },
  {
    id: 4, name: "ChocoFresatto",
    description: "Fresas cubiertas con chocolate. Incluye 1 topping: maní o grajeas.",
    price: 14000,
    customization: {
      steps: [
        { id:"topping", title:"Elige 1 topping", type:"single", required:true, choices:["Maní","Grajeas"] }
      ]
    }
  },
  {
    id: 5, name: "ChocoBowl",
    description: "Fresa picada, crema de la casa y chocolate derretido.",
    price: 18000
  },
  {
    id: 6, name: "Ensalada de Frutas",
    description: "Papaya, banano, fresa, melón, piña caramelizada, manzana, queso, bola de helado, dulce de mora y crema de la casa.",
    price: 15000,
    customization: {
      steps: [
        { id:"size", title:"Elige el tamaño", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"Pequeña", price:15000},
            {name:"Mediana", price:18000}
          ]
        }
      ]
    }
  },
  {
    id: 7, name: "Fresas con Crema",
    description: "Fresas con crema. Puedes combinarlas con banano.",
    price: 11000,
    customization: {
      steps: [
        { id:"size", title:"Elige el tamaño", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"Pequeña", price:11000, toppingMax:1, baseMax:1},
            {name:"Mediana", price:14000, toppingMax:2, baseMax:1},
            {name:"Medio Litro", price:17000, toppingMax:2, baseMax:2},
            {name:"Familiar", price:25000, toppingMax:3, baseMax:3}
          ]
        },
        { id:"topping", title:"Elige tus toppings", type:"multiple", required:true, min:1,
          choices:["Chip de chocolate","Maní","Barquillo","Chocmelos","Coco","Grajeas","Masmelos","Quipitos","Milo","Chococrispi","Oreo","Merengue","Chocoramo","Moritas","M&M","Gusanitos","Mini chips","Flips de chocolate","Leche en polvo","Granola"] },
        { id:"base", title:"Elige tus bases untables", type:"multiple", required:true, min:1,
          choices:["Leche condensada","Arequipe","Chocolate","Salsa de fresa","Dulce de mora"] },
        { id:"banana", title:"¿Quieres combinar con banano?", type:"single", required:false, choices:["Sí","No"] },
        { id:"extraTopping", title:"Toppings adicionales (+$2.500 c/u)", type:"multiple", required:false, choices:[
          {name:"Chip de chocolate", price:2500},{name:"Maní", price:2500},{name:"Barquillo", price:2500},{name:"Chocmelos", price:2500},{name:"Coco", price:2500},{name:"Grajeas", price:2500},{name:"Masmelos", price:2500},{name:"Quipitos", price:2500},{name:"Milo", price:2500},{name:"Chococrispi", price:2500},{name:"Oreo", price:2500},{name:"Merengue", price:2500},{name:"Chocoramo", price:2500},{name:"Moritas", price:2500},{name:"M&M", price:2500},{name:"Gusanitos", price:2500},{name:"Mini chips", price:2500},{name:"Flips de chocolate", price:2500},{name:"Leche en polvo", price:2500},{name:"Granola", price:2500}
        ] }
      ]
    }
  },
  {
    id: 8, name: "Quesudita",
    description: "Fresas con crema, queso en el medio y arriba, 1 base untable.",
    price: 15000,
    customization: {
      steps: [
        { id:"base", title:"Elige 1 base untable", type:"single", required:true,
          choices:["Leche condensada","Arequipe","Chocolate","Salsa de fresa","Dulce de mora"] }
      ]
    }
  },
  {
    id: 9, name: "Heladita",
    description: "Fresas con crema, 1 base untable y 1 bola de helado.",
    price: 16000,
    customization: {
      steps: [
        { id:"base", title:"Elige 1 base untable", type:"single", required:true,
          choices:["Leche condensada","Arequipe","Chocolate","Salsa de fresa","Dulce de mora"] }
      ]
    }
  },
  {
    id: 10, name: "Mini Donas",
    description: "Elige la cantidad, untables y toppings según la presentación.",
    price: 10000,
    customization: {
      steps: [
        { id:"size", title:"Elige la cantidad", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"6 Mini Donas", price:10000, untableMax:1, toppingMax:1},
            {name:"12 Mini Donas", price:18000, untableMax:2, toppingMax:2},
            {name:"20 Mini Donas", price:27000, untableMax:3, toppingMax:3}
          ]
        },
        { id:"untable", title:"Elige tus untables", type:"multiple", required:true, min:1,
          choices:["Arequipe","Crema de avellana","Leche condensada"] },
        { id:"topping", title:"Elige tus toppings", type:"multiple", required:true, min:1,
          choices:["Chips de chocolate","Maní","Confetti de chocolate","Barquillos","Gomitas","Chocolates","Confetti de colores","Masmelos","Oreo","Pepitas"] },
        { id:"extraTopping", title:"Toppings adicionales (+$2.500 c/u)", type:"multiple", required:false, choices:[
          {name:"Chip de chocolate", price:2500},{name:"Maní", price:2500},{name:"Barquillo", price:2500},{name:"Chocmelos", price:2500},{name:"Coco", price:2500},{name:"Grajeas", price:2500},{name:"Masmelos", price:2500},{name:"Quipitos", price:2500},{name:"Milo", price:2500},{name:"Chococrispi", price:2500},{name:"Oreo", price:2500},{name:"Merengue", price:2500},{name:"Chocoramo", price:2500},{name:"Moritas", price:2500},{name:"M&M", price:2500},{name:"Gusanitos", price:2500},{name:"Mini chips", price:2500},{name:"Flips de chocolate", price:2500},{name:"Leche en polvo", price:2500},{name:"Granola", price:2500}
        ] }
      ]
    }
  },
  {
    id: 11, name: "Mini Pancakes",
    description: "Fresas con crema, base untable, topping y mini pancakes.",
    price: 15000,
    customization: {
      steps: [
        { id:"size", title:"Elige el tamaño", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"Pequeña", price:15000, toppingMax:1},
            {name:"Mediana", price:18000, toppingMax:2}
          ]
        },
        { id:"untable", title:"Elige 1 base untable", type:"single", required:true,
          choices:["Leche condensada","Arequipe","Chocolate","Salsa de fresa","Dulce de mora"] },
        { id:"topping", title:"Elige tus toppings", type:"multiple", required:true, min:1,
          choices:["Chip de chocolate","Maní","Barquillo","Chocmelos","Coco","Grajeas","Masmelos","Quipitos","Milo","Chococrispi","Oreo","Merengue","Chocoramo","Moritas","M&M","Gusanitos","Mini chips","Flips de chocolate","Leche en polvo","Granola"] }
      ]
    }
  },
  {
    id: 12, name: "Bowl Frutal",
    description: "Mini pancakes, crema de la casa, fresa, banano, queso, helado y base untable.",
    price: 24000
  },
  {
    id: 13, name: "Postre en Vaso",
    description: "2 capas de torta de vainilla, 2 capas de crema y salsa de fresa, arequipe o chocolate.",
    price: 10000,
    customization: {
      steps: [
        { id:"size", title:"Elige el tamaño", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"9 onzas", price:10000},
            {name:"12 onzas", price:13000}
          ]
        },
        { id:"sauce", title:"Elige la salsa", type:"single", required:true,
          choices:["Salsa de fresa","Arequipe","Chocolate"] }
      ]
    }
  },
  {
    id: 14, name: "Cremosos",
    description: "Torta de semillas de amapola, crema de la casa y sabor de tu elección.",
    price: 15000,
    customization: {
      steps: [
        { id:"size", title:"Elige el tamaño", type:"single", required:true, priceMode:"replace",
          choices:[
            {name:"12 onzas", price:15000},
            {name:"16 onzas", price:19000}
          ]
        },
        { id:"flavor", title:"Elige el sabor", type:"single", required:true,
          choices:["Oreo con arequipe","Maracuyá (artesanal)","Frutos rojos (artesanal)","Brownie con fresa picada y crema de la casa"] }
      ]
    }
  },
  {
    id: 15, name: "Jugo",
    description: "Maracuyá, mora, fresa o guanábana.",
    price: 6000,
    customization: {
      steps: [
        { id:"flavor", title:"Elige el sabor", type:"single", required:true, choices:["Maracuyá","Mora","Fresa","Guanábana"] },
        { id:"base", title:"Elige la base", type:"single", required:true, priceMode:"replace",
          choices:[{name:"En agua", price:6000},{name:"En leche", price:7000}] }
      ]
    }
  },
  {
    id: 16, name:"Granizado", description:"Maracuyá, mora, fresa o guanábana.", price:8000,
    customization:{steps:[{id:"flavor",title:"Elige el sabor",type:"single",required:true,choices:["Maracuyá","Mora","Fresa","Guanábana"]}]}
  },
  { id: 17, name:"Milo", description:"Milo.", price:10000 },
  { id: 18, name:"Botella de agua", description:"Agua sin gas.", price:3500 },
  { id: 19, name:"Botella de agua con gas", description:"Agua con gas.", price:4000 }
];

window.FRESATTO_GENERAL_EXTRAS = {
  additionalToppingPrice: 2500,
  additional: [
    {name:"Nutella 9 y 12 oz", price:3000},
    {name:"Nutella 16 y 24 oz", price:4000},
    {name:"Queso", price:3000},
    {name:"Helado", price:3000},
    {name:"Brownie", price:3000},
    {name:"Crema de la casa", price:4000},
    {name:"Chocolate caliente", price:4000}
  ]
};
