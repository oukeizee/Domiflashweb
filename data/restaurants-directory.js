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

(function(){
  const FRESATTO_LOGO = "data:image/webp;base64,UklGRlYUAABXRUJQVlA4IEoUAABQVgCdASrwAMAAPsFWo00npKMiKxY7GPAYCWNu3V92KsSG63+ldZ+1vG5tqehDbo+YzzqfOZ9MDqi96LyFD0B/ne2j/Z+G/4/9V/m+Ld1R5rfyP79/xf8R6U97/zT/yfUI/JP63/ud75tr6AveXzyvp/NT7J+wD+rvFCUAv6H/iv2P9lH639GH6N/qfYN/YXfjT5905rZV0pD7RPUAukzsp8CcDx1+svXivPFwERhvIu2QanqgN/2dGEHP/q3qmw+KQEnP8oa8yKwuBuLvMNmLJMIADRb9dV0byGSXewSKfP/9ow75NMSpFw+ioViTJC2lHxWhssElegVL6HIFMHLMYxHRixqRFkXeoh6PJgKyE7BvOjhis7SIuY1LEHnoob0tP7VjBq/JbooIOueR6AQoH+hEgVyouxC1XM24gnbNPXcdwd2k1VZ7hrTWruioGzIm7Dte3U/5khY4rIHSD0F4277LwXvSPPfZY4zNVXbBc0s36NrZJt4iyY8GTsCOTdAixt6JphXONvUCAKqunErUgZPfd+6KvAKFV1eBjvhUiI7rWQfnpavPSZMRnJ9Pa/p7vdS/kA0Sqx6VYrh46zA1Tmv22Lp4xlCfHB4Ro80eD0v3UyND1Px98QYqytkWm0RmT/6zj/uPOsE0phaMr2Nwi5avnFJfvgBBF3on3DGodutTW02E3WK05sVt8CN3/WveaRLNSDjHvufGAtJj/HyXBy0h8SqbfC7Pr3wM+HKBBJ1M1gzBp4hhp6m7wKvMJpKyaUICI8RsvwpgvF3KBTZry3nPgxsLMA+hCIF81h3Si7sk1zHSTCMxDcoiXFda7f/gf5awE6euT4ZL+idrP6GdwnWLrkQ8R4BSq6kavCb76JFrKOy8w4w5SFtJaPyMN5lG/vMBzZVPs9GyYmaXn0CUAd5W76lr7k044AAA/vkzqGK9nkgCJmseOJtrTydW7a08DRzL2Pdxh0422aCfpJ5JVydQE3mo58GvBMlv8LW58bqCg0zzFmWVeNXvkItwLqbkYv9H2rIV6OKGfnjihQk+hay4mf9uKAHa4GPDrF+Kneot6dO0CXAwacrxqTIvdYe1V1adpEJ3jqGT7aVFzL/YL5qw+HKOi/PJgP/grjUk675me7IZQfFxdy6qCiYWhIi9If5+Ttt0wr5E7WreXGQ9JfWeryyxlMECkadYXCkJI0xiMcBgHt1fciWQDW9h9VVUUsJbIQ6LsEjtcpI/zBH68Cn00yfftdjpREIgXYJfdy73wFVe1n7ashvyr/OOsoSQup5CUNnETeJxadDGVI+s22NybIolxox3bMNbnhsUfDQFQsmDDzWmL1F4jTgLRSZa8QdE1AcYn4QoM1V4rvLZMIz39tfnLlZw+/5u6xTACbPNtOZ8USJXFht7+xArXWyzSIitf8toJN1tjCDQ8nmkWUomdadcucqVqob6Kp98njbMcCXrKjIjTKwB2FgDTd4xuGpQftaQC0XoTc6m2FEWZCZZ+HlZTtsEqLh6ORtT4nj1b+mxHCd4JfqzYKJWL+QZO1rQL8vZeiKRPVLY1pj9L5qetc4v+8WLct8f6C2bjJoMC+CjX3BbC+6LECJOzdVSBTTzUO0Lq5kDLvJWB6U6gpmHYx6xeMpMCj5DrY0Vfu47RFrsLzHjPSqqvxMcQmB/yNWljCHLILwOSqNUmmeR02CU1iHRNmTNbGKDlLKkR39Lh3ZyxPjMSmQT4/Vk0svDlOg8ugaF3vqrzbmqiFLLadtxMhKRqxWyDD52EFfjRopKiQMeIRv3sDsCngnUE2M275ZByLlzzoePfzl8x051HBtEHeAntISVL0KTXyLhmu1BlerPujCaqu6lgoKA+tV4NXP5cX/6zNlmZIn/76ZoR1ikefVj9JUg/Y6WOCafJ7QuxR9dWRvit5Wxv8s+yP/ptcKCrRxIVkhJl4lm75IbUV4EVQv7QG8QlzuMeMUjVMyUkhgMFlnBzDFmYmywtgCZqjNOE+ZtRpHZQ/qz71oEdVqwSdIc2ErE9Y8n2Tk1KvRIvCx9UWJsbYMy2rYLPDXk72hp6GY6N7rMrnCzwVZujjntiHQZ2k6PgVgW4NGwU1oX1fHe/MWLuZ4DuUQRmhnin8eV/m7koPY2u6kQLMftpziR1iz+LvjDt5ihVt3QklXKskaHk9E9kf7rghNiFsVzlchcK2twiiga4HSupHBKGCiCc0uBfCP33bN4GNmwJkotKDU4cVL9XduWPv16dR1SflKKweh6JbKZ58pxMCRE1gB/yzNtuq5MLws0gTyVZfXp8X3sghicclbd0fkVI/R2j0/ZpvxuCnYYr3PuoCrKrDNzGo9MnWSQmJ2JFEOsQVlq8SMCf1zIuYLOEjyg98ORHQHWeHX1cxxhYxqhbmSx63nAC21Ug6EGoSJ5XjEGUBHNU0gnG2wg1+wxv/Fz+RhS5qXNh0Rx0MFMKaCg4llOpcud7UAmvXzj8pNepj+jeWhw8u/UaoCI62OJdTBwipCq6vKq6+tRsA2ptLx0DKhjiznpff4okI/s7aTF2OSyQGqWofiXsBrkW7DYz9d36flSPO+yJDTXwNYM/8QDIf/aJklSjcerxzj2tEYFTrkbMUYw/7d4eT0f0hmlUIPrHN7tb4QSA6os7rmY2BS2Y6E1MgSKA1TteDUkumCkf/pZfvmUIxy3+ib++c5dGtShQzkosBinbT2sspCyW1xsG8XAfbXGdC5PBrG0am6eKvtG4YhblopD7q1L9Vc3nLF5PR+H/nb9fPvVqk/IT+Z0oQFRn39cRPTs+RJmv+OjIGuida5vm0lAkCJ8heWkDiJ1xIYlcMQ6AnYOzVhrsgPlXq4in4tOoLVwO/Qnj04maBHWr/DjcOG/bA/09xizSL3jQp0bFYP961bG9B2FI9IxUIfFNd+VdkQSQasnSsRF0RctB61cuSiNtuPwmbANFY0vNdsFHfLEOL1CjD05+y8tZ1xW/YchRbu18syncvSx1rOxIh+rrfF0iuumCSBTteKRWiRiW+Rg9JcQsm3E2bzwq7Mg4//iy8nSv0Hudrpku1Tx/mGs8Jg9o68HeEB0HMpW3Z/pcKm9ZUSKNs6fnRNqQN8Q4hucJdJBNveCWh9HcYKIk9gdOk+WSj26TJ6Vp81DKS1pG83HpuBNpLSJtuaMVRnf/cdkLwcpkuaUMkH/gMv0IPTISb/1Z6M3ylxA2oEUCwUHbt6Hr73J7fY8wFVY4fPNg5eAvH0C1iatlTjutuRWrAtZSV1l5N/pb4GZoZeUxP0ZY02Ll7JIlmroYjJaHqMWeMC1thG2Rvb2JltjZpdqyWExaIyfKjKGjf6Hx9UA8N3K+EPcWZcW1ZaxGiwf9aJ3hDaszCVDrNNtWxk5FoHbX/Pf5IeKquBgIh6hxVBoRKsCN+G7z7LCsSHKfK3pitEoaAxOzMb/kud1GZNcgr/c/x21SeCRm33HpgbMc5WbXacFjm8hpELyd2ws4S5uPLNIMqehsbAaFNVm5VIr4qNCXSMyU5gEu6gEure580nBmJMgKmujAcEy/f1jposOni7UJPRM4nvmc3EEbgXQ+maxRWmAb90xNUoil+2hE1LE+k1RLNuo8IvfAWLUiAOtReQMIxJfRbiOhCV0IOprLtD8qHIVyySJD+0hd39tHB0vmRx3aCjUUruzVvx5idFI7pa497a2eSUq66rLBqqZdgaUkwwBmc0V1kCUeBFnHOc8S3BrNQCTYcX/DmK+lImwm309CtQ28HAfOvmuCd8pXMh2NbI8INjZEquCB5eI/EgCoER/4FPpRnHAKIYyhruZGq65m39Eg9kllsbiGXZkmLUQ5SFjaWSEelqbvHYBlC5tDo6N1rWPNDBOJxnFDRCXssRaXV4pAkleyuX22PmYa1dqWOycuMMH+9neCV3N5SH3gNuuEgEPt56PuCTk73f1vxMsnaVz9rQnV9j7FZCcBfaTkONtyNUpC2ib/JZrwI1f59+ScX9u75H0GVGM+/BEoKDW7vJmRmhr57r2NFo7ev4mIcF3TgkKZc9O9zWzFt3X5cIqFvhXlO+eqOFPGNdkbzJcWWVYv3w22nKA+JN2U6IFNf8hRvL7XLSAgfWVpl67/d6ASJ0/pLsCh9IuvdVv7D1i1Sy6ldl3LpGXgDhRggdaPUrQ2eYPZrRLmWrqAoQbqRbGDoyPgBCri6sAQwjY8LHNWV8p9D70XQITxGaWRFct5sj0bXEcW2x6XUqihVqgNOnLv/mGrFzKk3vdDpUJK0xKdI12pepUIKICcad7d68YePK+T1PqUBdqwhHnEAUFQnAMv1w04sbTKLpWS18UtweuaOEmQ5mJsYYFBesV9oYetwTqhYVrJgt8m1UX/1ccCzs6HyE8i5OOqAFosQjtwab2cdqoWc8uPRH4oUKjEDEPsZLMm6NRiygp+KksKCVeav+ZQFtP+gYtoDJAGNFRaMOJGgsK/l2ta2BhQwP2RSsIpkoNg5qPovG74jl+U6TuBFFW876n2UPBYKWL5XwFZRmP/p879n7TPl/d/7YJfwAqLvaaEB2gx/ufv3Lf0d8ONnEuM/MzG5x+zCFWo+/nfn/Id3WsXtSdU79c7N0niyE0TQtjnhZMZPuyHkSjGVfQWbs9ccqwEPCMertxAtvbXxjnBzwLI+w/cHfQyM7seI2qrMTrWiwmCOWXz4AECQ4HMAnqjjOxO4kAxHWB6KNk9nG/8/I2/hxG8qdqLQoYjtklaDUDRp5E94JT27AjdwjBX/2TyWFWgNDIeup9mkVkM7ohgpUD9WoCj2xY36cUmBNMozO85/F4TAfho0JqhBRk5YPxsZOS4RJ6Jt0T1AebpJbbqXxlDqwP0ZIYaOb9vDTVoc8xUWkjo84tRcQIonup1BHEjc/MRy9g8p8Z/KCk8UWYZOWa4c13/f5olG4/kyoXMk/bmqoswgq0nBc0YN7bAe1n/4nLlcFRO4PRXKzV5DyvldMtyFL3MSZ3+aJdGT4dSbxGLI1gtXQgzg6AyOvpGTYyw/TYJtQCK/gp8lXRLs8HkRO2MfP/b/EHckjnYlPf1G1yuFqLVukYkCj7YSWcWPG01U83uRaA4+MLq0QoDE7N32+jJYoE/AGLyKOT0PnRXTYFEieuaq5i/Wap0GzFsCGc58B5DVfsX1eh37ljLMFclUWAa0AxqXGOi/jdomwnBJHu/c27HG7LBUs3Wq5B64S3rhn8WyV/JOrlMuj3NMrYrKuj2RQ3T6VJCmG/KcoakX+bTyVooVLPHjiiaWkWaYA9ojUzfdqxLVXYirN96E2+yI8XjCTQIssiPN3aChLDyqr/k8Demg5luW47+nt6dcBE6/R7r1R+3ITS99cnmTnp4Yuraj8dFNqeXn7KHzfsw9IjplDOfWU300H6mmwsZYE/E1OYloobeXcx+9Hu3gd0Qyh0IxGPBS0RaV5E5mcEqeF/Ta/8UfuOhsx7+O193TpNE9kd3wkv13K9o9nO0hVUpftgFyNnScdbfTDtOGmjfTXu1gH9i72TUTbTy3DWbfTyM56PS8NUcfJwiUh+Ux+b9B0tCYMdCCC0d2EajRJHkSito1vOqsoJrvWh1bthue9MC4kkUm+l/qjDC96rJSxJLoitUg32sg6rLfspEyAuoAHUDjm5uHfyC1dcNUbetr0CzWRAVhq9R5Jxu03eQwj5KThvlTEWfSU/Ijv06inuId5u/Ey3pyvLUEFuLI4+DCMZR4iZYuwdSQ0boxkj5hGeIu+a4sdZTg25LzQ/VnsyPmelx4vlyRFz+12A5rRP4KOgLkevdzRPpchi6leBoCewevoKJTRI44+cQDQJ3x8U8rA7/oAydYbz4r5LI8+tMwVGTfDJf00yNdsGioBPnjNU2PsCjI+ok+GBUCVMtnts79KTpYyScWxQcVc519cIbzKcEeMHyH+anpEpeD0H5CzMdQI7vUl9MpcoM7KHujP8uaQV/a5fbaahzUkP3fUOaVb5usYAen8Jzogg/wZsRQMo/5D0JcRi+9y3/V99bO/zRzcqusG1WEdZUzJo1Y/Y6P1VWt6GK9RGtMCoMr19Rb5el5wurRnh+tHnMNzTdf6L7/2EpamiqScd6NNxMt8rqfwsji8ztOEYGl0EH2/b1lb4TVxXv72nS7zaSrMBfJeZVNfoh08VT4GkRBxo1/2OskdyNPxlUfDXWZfcU6oCZ/EeRMiAQvAPSUNo2gw6CWScyjwD4SVRZfqBh4YRDsx+YezLUQLGGD01LCCLUymILpZDg1d4wecjH93VQVraRKofunLz2NgeRYU+28Q8iep81Jo9Rz2oSALbbKVjeYqIMAK3NGnQD6jC4AnAAmMoa5bcED5a24i8T4qzm/Ro+H9TLF3veRFI4i8B2dTBCv36dS+fRQ9bk9P9opnaZHOEnf/LhHmMRE4GPEqHwHA/4BmXnPKuQvL9wALN0EbNnZr6ccZ0DnM4W7xGm31Fd9U1tlI14j+e30r0yd6/T3cIr3ozOmqxHewSVRtGhoF2FmhjQ/NuSZ0hNxR6JxCleucop8Kl7GQxfMtTWWRHxlwO9fUceYQgpDCWkBp1cMIJyoqCe6QFRAcT9QLYyvpM57t02w7vK8mdioQmEGjr0MtFCQpt4EOiBlcGla8leOWOJa7iqw3mbombWbk2DTibBucUqJuSLVP/VT7rR7E7rISuxyRZ2Ff+tuh5IWKojLVpHPbXE5fIaaLPE2HnkYohcuQlQAl1O+ONx3G5LfyruKDBWTFJsp/MFXh7yKv5sWL03M4SvEjGC0cNpJppfQNDN5ig3yrqFxKByPF8iekGGgAHNunDbm/e4nTxUV9Pt7GCV1vd10R0FoABE+K/sed4N7DuZFVX4Deg3AE+MrMRSgMKHkCFRBKYAikKmmY+ob2Gg8AdxhAkfgiEBLO88evAAGDvk7akdpXTiQvZw6YpOQ/d7a1NUC5qXpwUa8CfgAAAA";

  function addFresattoLogo(){
    const cards = document.querySelectorAll(".restaurant-card");
    const card = Array.from(cards).find(c => c.querySelector(".restaurant-number")?.textContent.trim() === "03");
    if(!card || card.querySelector(".restaurant-card-logo")) return;
    const logo = document.createElement("img");
    logo.className = "restaurant-card-logo";
    logo.src = FRESATTO_LOGO;
    logo.alt = "Fresatto";
    logo.loading = "eager";
    logo.decoding = "async";
    Object.assign(logo.style,{width:"78px",height:"78px",objectFit:"cover",borderRadius:"50%",border:"2px solid rgba(255,179,0,.55)",boxShadow:"0 8px 22px rgba(0,0,0,.35)",margin:"10px 0 2px"});
    const first = card.firstElementChild;
    if(first) first.insertAdjacentElement("afterend",logo);
  }
  document.addEventListener("DOMContentLoaded",()=>setTimeout(addFresattoLogo,150));
  setTimeout(addFresattoLogo,900);
})();
