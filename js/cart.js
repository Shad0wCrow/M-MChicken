
const Carrito = (() => {
  "use strict";

  const CLAVE_STORAGE = "mmc_pedido_v1";
  const MAX_POR_PRODUCTO = 99;
  const MAX_NOMBRE = 40;

  const MODALIDADES = Object.freeze({
    mesa: "Estoy en mesa",
    recoger: "Recogeré"
  });

  let cantidades = {}; 
  let modalidad = null; 
  let nombre = "";
  const oyentes = [];

  const buscar = (id) => productos.find((p) => p.id === id);
  const redondear = (n) => Math.round(n * 100) / 100;
  const modalidadValida = (m) =>
    typeof m === "string" && Object.prototype.hasOwnProperty.call(MODALIDADES, m);

  function guardar() {
    try {
      localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify({ items: cantidades, modalidad, nombre })
      );
    } catch (_) {
    }
  }

  function cargar() {
    try {
      const datos = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "null");
      if (!datos || typeof datos !== "object") return;

      Object.entries(datos.items || {}).forEach(([id, cant]) => {
        const n = Math.floor(Number(cant));
        if (buscar(Number(id)) && n > 0) {
          cantidades[id] = Math.min(n, MAX_POR_PRODUCTO);
        }
      });
      if (modalidadValida(datos.modalidad)) modalidad = datos.modalidad;
      if (typeof datos.nombre === "string") nombre = datos.nombre.slice(0, MAX_NOMBRE);
    } catch (_) {
      cantidades = {};
    }
  }

  function notificar() {
    guardar();
    oyentes.forEach((fn) => fn());
  }

  const cantidad = (id) => cantidades[id] || 0;

  function fijar(id, nueva) {
    if (!buscar(id)) return;
    const n = Math.max(0, Math.min(MAX_POR_PRODUCTO, Math.floor(Number(nueva) || 0)));
    if (n === 0) delete cantidades[id];
    else cantidades[id] = n;
    notificar();
  }

  const cambiar = (id, delta) => fijar(id, cantidad(id) + delta);

  function vaciar() {
    cantidades = {};
    notificar();
  }

  function lineas() {
    return productos
      .filter((p) => cantidad(p.id) > 0)
      .map((p) => ({
        producto: p,
        cantidad: cantidad(p.id),
        subtotal: redondear(p.precio * cantidad(p.id))
      }));
  }

  const unidades = () => lineas().reduce((suma, l) => suma + l.cantidad, 0);
  const total = () => redondear(lineas().reduce((suma, l) => suma + l.subtotal, 0));

  function fijarModalidad(valor) {
    modalidad = modalidadValida(valor) ? valor : null;
    notificar();
  }

  function fijarNombre(valor) {
    nombre = String(valor).slice(0, MAX_NOMBRE);
    guardar(); 
  }

  function validar() {
    if (lineas().length === 0) {
      return { ok: false, campo: "carrito", mensaje: "Añade al menos un producto a tu pedido." };
    }
    if (!modalidad) {
      return { ok: false, campo: "modalidad", mensaje: "Elige cómo recibirás tu pedido: en mesa o para recoger." };
    }
    if (modalidad === "mesa" && nombre.trim() === "") {
      return { ok: false, campo: "nombre", mensaje: "Escribe un nombre para el pedido." };
    }
    return { ok: true };
  }

  function armarMensaje(items, modalidadElegida, nombreCliente) {
    const partes = ["Hola M&M Chicken, mi orden es:"];
    items.forEach((l) => partes.push(`${l.producto.nombre} ${l.cantidad}`));
    if (modalidadElegida === "mesa") partes.push(`Nombre: ${nombreCliente.trim()}`);
    partes.push(`Modalidad: ${MODALIDADES[modalidadElegida]}`);
    return partes.join("\n\n");
  }

  const construirMensaje = () => armarMensaje(lineas(), modalidad, nombre);

  const urlWhatsApp = (mensaje) =>
    `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

  const construirUrl = () => urlWhatsApp(construirMensaje());

  const suscribir = (fn) => oyentes.push(fn);

  cargar();

  return Object.freeze({
    MAX_POR_PRODUCTO,
    MAX_NOMBRE,
    MODALIDADES,
    cantidad,
    fijar,
    cambiar,
    vaciar,
    lineas,
    unidades,
    total,
    fijarModalidad,
    fijarNombre,
    modalidad: () => modalidad,
    nombre: () => nombre,
    validar,
    armarMensaje,
    construirMensaje,
    construirUrl,
    urlWhatsApp,
    suscribir
  });
})();