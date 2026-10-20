const WHATSAPP_NUMERO = "59170768620";

const IMAGEN_PROVISIONAL = "assets/plato.jpg";
const cocacola500 = "assets/cocacola500.png"
const fanta500 = "assets/fanta500.jpeg"
const sprite500 = "assets/sprite500.jpeg"
const cocacola300 = "assets/cocacola300.jpeg"
const fanta300 = "assets/fanta300.jpeg"
const sprite300 = "assets/sprite300.jpeg"
const polloBroasterEconomico = "assets/polloBroasterEconomico.jpeg"
const polloBroasterCuarto = "assets/polloBroasterCuarto.jpeg"
const lomitoEnPlato = "assets/lomitoEnPlato.jpeg"
const sillpancho = "assets/sillpancho.jpeg"
const trancapecho = "assets/trancapecho.jpeg"
const promotrancapecho = "assets/trancapecho.jpeg"


const categorias = [
  { id: "comidas", etiqueta: "Comidas", titulo: "Comidas" },
  { id: "bebidas", etiqueta: "Bebidas", titulo: "Bebidas" },
  { id: "promociones", etiqueta: "Promociones", titulo: "Promociones" }
];

const productos = [
  { id: 1, categoria: "comidas", nombre: "Pollo Broaster Económico", descripcion: "Pollo a la broaster con arroz, papas fritas, salsas y llajua.", precio: 19.0, imagen: polloBroasterEconomico },
{ id: 2, categoria: "comidas", nombre: "Pollo Broaster Cuarto", descripcion: "2 Presas de pollo a la broaster con arroz, papas fritas, salsas y llajua.", precio: 34.0, imagen: polloBroasterCuarto },
{ id: 3, categoria: "comidas", nombre: "Lomito en plato", descripcion: "Carne de res con chorrellana, acompañada de arroz, papas fritas y huevo.", precio: 22.0, imagen: lomitoEnPlato },
{ id: 4, categoria: "comidas", nombre: "Sillpancho", descripcion: "Carne de res molida acompañada de arroz, papas fritas, huevo y guarnición de verduras.", precio: 21.0, imagen: sillpancho },
{ id: 5, categoria: "comidas", nombre: "Trancapecho", descripcion: "Pan relleno con carne de res molida, acompañado de arroz, papas fritas y huevo.", precio: 19.0, imagen: trancapecho },


  { id: 101, categoria: "bebidas", nombre: "Coca-Cola 500 ml", descripcion: "Bebida gaseosa para compartir.", precio: 10.0, imagen: cocacola500 },
  { id: 102, categoria: "bebidas", nombre: "Fanta 500 ml", descripcion: "Bebida gaseosa para compartir.", precio: 10.0, imagen: fanta500 },
  { id: 103, categoria: "bebidas", nombre: "Sprite 500 ml", descripcion: "Bebida gaseosa para compartir.", precio: 10.0, imagen: sprite500 },
  { id: 104, categoria: "bebidas", nombre: "Coca-Cola 300 ml", descripcion: "Bebida gaseosa individual.", precio: 8.0, imagen: cocacola300 },
  { id: 105, categoria: "bebidas", nombre: "Fanta 300 ml", descripcion: "Bebida gaseosa individual.", precio: 8.0, imagen: fanta300 },
  { id: 106, categoria: "bebidas", nombre: "Sprite 300 ml", descripcion: "Bebida gaseosa individual.", precio: 8.0, imagen: sprite300 },
  

  { id: 201, categoria: "promociones", nombre: "Trancapecho con refresco", descripcion: "1 Trancapecho acompañado de un refresco de 300 ml a elección.", precio: 27.0, imagen: promotrancapecho, etiqueta: "Promo" },
];
