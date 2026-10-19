const WHATSAPP_NUMERO = "59170768620";

const IMAGEN_PROVISIONAL = "assets/plato.jpg";

const categorias = [
  { id: "comidas", etiqueta: "Comidas", titulo: "Comidas" },
  { id: "bebidas", etiqueta: "Bebidas", titulo: "Bebidas" },
  { id: "promociones", etiqueta: "Promociones", titulo: "Promociones" }
];

const productos = [
  { id: 1, categoria: "comidas", nombre: "Pollo Broaster", descripcion: "Pollo crujiente acompañado de papas y ensalada.", precio: 45.0, imagen: IMAGEN_PROVISIONAL },
  { id: 2, categoria: "comidas", nombre: "Silpancho", descripcion: "Carne apanada sobre arroz y papas, con huevo y ensalada.", precio: 40.0, imagen: IMAGEN_PROVISIONAL },
  { id: 3, categoria: "comidas", nombre: "Pollo al Spiedo", descripcion: "Pollo asado al spiedo con guarniciones a elección.", precio: 42.0, imagen: IMAGEN_PROVISIONAL },
  { id: 4, categoria: "comidas", nombre: "Lomito", descripcion: "Lomo de res jugoso con arroz, papas y ensalada fresca.", precio: 48.0, imagen: IMAGEN_PROVISIONAL },
  { id: 5, categoria: "comidas", nombre: "Lomito con Pan", descripcion: "Lomito servido en pan crujiente con papas.", precio: 38.0, imagen: IMAGEN_PROVISIONAL },
  { id: 6, categoria: "comidas", nombre: "Trancapecho", descripcion: "Carne apanada en pan con huevo, tomate y cebolla.", precio: 35.0, imagen: IMAGEN_PROVISIONAL },
  { id: 7, categoria: "comidas", nombre: "Económico", descripcion: "Porción económica de pollo con papas y arroz.", precio: 25.0, imagen: IMAGEN_PROVISIONAL },
  { id: 8, categoria: "comidas", nombre: "Cuarto", descripcion: "Cuarto de pollo con papas fritas y ensalada.", precio: 30.0, imagen: IMAGEN_PROVISIONAL },

  { id: 101, categoria: "bebidas", nombre: "Gaseosa 2 Litros", descripcion: "Bebida gaseosa bien fría para compartir.", precio: 15.0, imagen: IMAGEN_PROVISIONAL },
  { id: 102, categoria: "bebidas", nombre: "Gaseosa Personal", descripcion: "Bebida gaseosa individual.", precio: 7.0, imagen: IMAGEN_PROVISIONAL },
  { id: 103, categoria: "bebidas", nombre: "Jugo Natural", descripcion: "Jugo de fruta natural de temporada.", precio: 12.0, imagen: IMAGEN_PROVISIONAL },
  { id: 104, categoria: "bebidas", nombre: "Refresco de la Casa", descripcion: "Refresco tradicional preparado en el día.", precio: 8.0, imagen: IMAGEN_PROVISIONAL },
  { id: 105, categoria: "bebidas", nombre: "Agua Mineral", descripcion: "Agua mineral embotellada.", precio: 6.0, imagen: IMAGEN_PROVISIONAL },
  { id: 106, categoria: "bebidas", nombre: "Cerveza", descripcion: "Cerveza nacional bien helada.", precio: 20.0, imagen: IMAGEN_PROVISIONAL },

  { id: 201, categoria: "promociones", nombre: "Combo Familiar", descripcion: "Pollo entero con papas, ensalada y gaseosa de 2 litros.", precio: 120.0, imagen: IMAGEN_PROVISIONAL, etiqueta: "Promo" },
  { id: 202, categoria: "promociones", nombre: "Combo Dúo", descripcion: "Dos platos a elección más dos bebidas personales.", precio: 85.0, imagen: IMAGEN_PROVISIONAL, etiqueta: "Promo" },
  { id: 203, categoria: "promociones", nombre: "Combo Personal", descripcion: "Un plato a elección con bebida incluida.", precio: 50.0, imagen: IMAGEN_PROVISIONAL, etiqueta: "Promo" }
];
