(() => {
  "use strict";

  const MENSAJE_GENERAL = "Hola, quisiera realizar un pedido";

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat("es-BO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor) + " Bs.";

  const el = (tag, className, texto) => {
    const nodo = document.createElement(tag);
    if (className) nodo.className = className;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  };

  const $ = (selector) => document.querySelector(selector);

  function crearBotonStepper(accion, simbolo, etiqueta, id) {
    const boton = el("button", "stepper__btn", simbolo);
    boton.type = "button";
    boton.dataset.action = accion;
    boton.dataset.id = id;
    boton.setAttribute("aria-label", etiqueta);
    return boton;
  }

  function crearStepper(producto) {
    const grupo = el("div", "stepper");
    grupo.setAttribute("role", "group");
    grupo.setAttribute("aria-label", `Cantidad de ${producto.nombre}`);

    const valor = el("span", "stepper__value", String(Carrito.cantidad(producto.id)));
    valor.dataset.qty = producto.id;

    grupo.append(
      crearBotonStepper("dec", "−", `Quitar una unidad de ${producto.nombre}`, producto.id),
      valor,
      crearBotonStepper("inc", "+", `Añadir una unidad de ${producto.nombre}`, producto.id)
    );
    return grupo;
  }

  function crearTarjeta(producto) {
    const esPromo = producto.categoria === "promociones";
    const card = el("article", "card" + (esPromo ? " card--promo" : ""));
    card.dataset.id = producto.id;

    const media = el("div", "card__media");
    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = `Foto de ${producto.nombre}`;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 600;
    img.height = 450;
    media.appendChild(img);
    card.appendChild(media);

    if (esPromo) card.appendChild(el("span", "badge", producto.etiqueta || "Promo"));

    const body = el("div", "card__body");
    body.appendChild(el("h3", "card__name", producto.nombre));
    body.appendChild(el("p", "card__desc", producto.descripcion));

    const foot = el("div", "card__foot");
    foot.appendChild(el("span", "card__price", formatearPrecio(producto.precio)));
    foot.appendChild(crearStepper(producto));

    body.appendChild(foot);
    card.appendChild(body);
    return card;
  }

  function renderCatalogo() {
    const contenedor = $("#catalogo");
    const lista = $("#tabsList");

    categorias.forEach((cat) => {
      const seccion = el("section", "section");
      seccion.id = cat.id;
      seccion.setAttribute("aria-labelledby", `titulo-${cat.id}`);

      const head = el("div", "section__head");
      const titulo = el("h2", "section__title", cat.titulo);
      titulo.id = `titulo-${cat.id}`;
      head.appendChild(titulo);
      seccion.appendChild(head);

      const grid = el("div", "grid");
      productos
        .filter((p) => p.categoria === cat.id)
        .forEach((p) => grid.appendChild(crearTarjeta(p)));
      seccion.appendChild(grid);
      contenedor.appendChild(seccion);

      const li = el("li");
      const tab = el("button", "tab", cat.etiqueta);
      tab.type = "button";
      tab.dataset.target = cat.id;
      li.appendChild(tab);
      lista.appendChild(li);
    });
  }

  function configurarEnlacesGenerales() {
    document.querySelectorAll("[data-wa-general]").forEach((a) => {
      a.href = Carrito.urlWhatsApp(MENSAJE_GENERAL);
    });
  }

  function configurarPestanas() {
    const tabs = [...document.querySelectorAll(".tab")];
    const secciones = categorias.map((c) => document.getElementById(c.id));

    const activar = (id) => {
      tabs.forEach((t) => {
        const activa = t.dataset.target === id;
        t.classList.toggle("is-active", activa);
        if (activa) {
          t.setAttribute("aria-current", "true");
          const lista = t.closest(".tabs__list");
          const objetivo = t.offsetLeft - (lista.clientWidth - t.offsetWidth) / 2;
          lista.scrollTo({ left: objetivo, behavior: "smooth" });
        } else {
          t.removeAttribute("aria-current");
        }
      });
    };

    tabs.forEach((t) =>
      t.addEventListener("click", () => {
        const destino = document.getElementById(t.dataset.target);
        if (!destino) return;
        activar(t.dataset.target);
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${t.dataset.target}`);
      })
    );

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) activar(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    secciones.forEach((s) => observador.observe(s));

    new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          tabs.forEach((t) => {
            t.classList.remove("is-active");
            t.removeAttribute("aria-current");
          });
        }
      },
      { threshold: [0.6] }
    ).observe($("#inicio"));
  }

  const ui = {};

  function referenciasCarrito() {
    Object.assign(ui, {
      boton: $("#cartBtn"),
      botonTotal: $("#cartBtnTotal"),
      contador: $("#cartCount"),
      estado: $("#cartStatus"),
      panel: $("#cartPanel"),
      fondo: $("#cartBackdrop"),
      cerrar: $("#cartClose"),
      vaciar: $("#cartClear"),
      vacio: $("#cartEmpty"),
      lista: $("#cartList"),
      grupoModo: $("#modeGroup"),
      radios: [...document.querySelectorAll('input[name="modalidad"]')],
      campoNombre: $("#nameField"),
      inputNombre: $("#nombreInput"),
      total: $("#cartTotal"),
      error: $("#formError"),
      enviar: $("#sendBtn")
    });
  }

  function sincronizarCantidades() {
    document.querySelectorAll("[data-qty]").forEach((n) => {
      n.textContent = String(Carrito.cantidad(Number(n.dataset.qty)));
    });
    document.querySelectorAll('[data-action="dec"]').forEach((b) => {
      b.disabled = Carrito.cantidad(Number(b.dataset.id)) === 0;
    });
    document.querySelectorAll('[data-action="inc"]').forEach((b) => {
      b.disabled = Carrito.cantidad(Number(b.dataset.id)) >= Carrito.MAX_POR_PRODUCTO;
    });
    document.querySelectorAll(".card").forEach((c) => {
      c.classList.toggle("is-selected", Carrito.cantidad(Number(c.dataset.id)) > 0);
    });
  }

  function crearFilaCarrito(linea) {
    const { producto, subtotal } = linea;
    const fila = el("li", "cart-item");

    const quitar = el("button", "link-btn", "Quitar");
    quitar.type = "button";
    quitar.dataset.action = "remove";
    quitar.dataset.id = producto.id;
    quitar.setAttribute("aria-label", `Quitar ${producto.nombre} del carrito`);

    const meta = el("div", "cart-item__meta");
    meta.append(el("span", "cart-item__unit", `${formatearPrecio(producto.precio)} c/u`), quitar);

    fila.append(
      el("p", "cart-item__name", producto.nombre),
      el("p", "cart-item__sub", formatearPrecio(subtotal)),
      meta,
      crearStepper(producto)
    );
    return fila;
  }

  function renderHeader() {
    const unidades = Carrito.unidades();
    const total = Carrito.total();
    ui.contador.textContent = String(unidades);
    ui.botonTotal.textContent = unidades > 0 ? formatearPrecio(total) : "";
    ui.boton.classList.toggle("has-items", unidades > 0);

    const texto =
      unidades === 0
        ? "Carrito vacío"
        : `Carrito: ${unidades} ${unidades === 1 ? "unidad" : "unidades"}, total ${formatearPrecio(total)}`;
    ui.boton.setAttribute("aria-label", `Abrir carrito. ${texto}`);
    ui.estado.textContent = texto;
  }

  function renderPanel() {
    const activo = document.activeElement;
    const recordar =
      activo && ui.lista.contains(activo)
        ? { accion: activo.dataset.action, id: activo.dataset.id }
        : null;

    const lineas = Carrito.lineas();
    ui.lista.replaceChildren(...lineas.map(crearFilaCarrito));
    ui.vacio.hidden = lineas.length > 0;
    ui.vaciar.hidden = lineas.length === 0;
    ui.total.textContent = formatearPrecio(Carrito.total());
    ui.enviar.disabled = lineas.length === 0;

    const modalidad = Carrito.modalidad();
    ui.radios.forEach((r) => {
      r.checked = r.value === modalidad;
    });
    ui.campoNombre.hidden = modalidad !== "mesa";
    ui.inputNombre.required = modalidad === "mesa";

    if (recordar) {
      const mismo = ui.lista.querySelector(
        `[data-action="${recordar.accion}"][data-id="${recordar.id}"]`
      );
      if (mismo && !mismo.disabled) mismo.focus();
      else ui.panel.focus();
    }
  }

  function sincronizarTodo() {
    sincronizarCantidades();
    renderHeader();
    renderPanel();
  }

  function mostrarError(mensaje, campo) {
    ui.error.textContent = mensaje;
    ui.error.hidden = false;
    ui.grupoModo.classList.toggle("is-invalid", campo === "modalidad");
    ui.inputNombre.setAttribute("aria-invalid", String(campo === "nombre"));
  }

  function limpiarError() {
    ui.error.hidden = true;
    ui.error.textContent = "";
    ui.grupoModo.classList.remove("is-invalid");
    ui.inputNombre.removeAttribute("aria-invalid");
  }

  let focoPrevio = null;

  const panelAbierto = () => ui.panel.classList.contains("is-open");

  function abrirCarrito() {
    focoPrevio = document.activeElement;
    ui.panel.classList.add("is-open");
    ui.fondo.hidden = false;
    document.body.classList.add("no-scroll");
    ui.boton.setAttribute("aria-expanded", "true");
    ui.cerrar.focus();
  }

  function cerrarCarrito() {
    ui.panel.classList.remove("is-open");
    ui.fondo.hidden = true;
    document.body.classList.remove("no-scroll");
    ui.boton.setAttribute("aria-expanded", "false");
    if (focoPrevio && typeof focoPrevio.focus === "function") focoPrevio.focus();
  }

  function atraparTab(e) {
    const enfocables = [
      ...ui.panel.querySelectorAll("button:not([disabled]), input:not([disabled])")
    ].filter((n) => !n.closest("[hidden]"));
    if (enfocables.length === 0) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  }

  function enviarPedido() {
    const validacion = Carrito.validar();
    if (!validacion.ok) {
      mostrarError(validacion.mensaje, validacion.campo);
      if (validacion.campo === "modalidad") ui.radios[0].focus();
      if (validacion.campo === "nombre") ui.inputNombre.focus();
      return;
    }
    limpiarError();
    window.open(Carrito.construirUrl(), "_blank", "noopener");
  }

  function configurarCarrito() {
    referenciasCarrito();

    document.addEventListener("click", (e) => {
      const control = e.target.closest("[data-action]");
      if (!control) return;
      const id = Number(control.dataset.id);
      if (control.dataset.action === "inc") Carrito.cambiar(id, 1);
      else if (control.dataset.action === "dec") Carrito.cambiar(id, -1);
      else if (control.dataset.action === "remove") Carrito.fijar(id, 0);
      limpiarError();
    });

    ui.boton.addEventListener("click", abrirCarrito);
    ui.cerrar.addEventListener("click", cerrarCarrito);
    ui.fondo.addEventListener("click", cerrarCarrito);
    ui.vaciar.addEventListener("click", () => {
      Carrito.vaciar();
      limpiarError();
    });

    ui.radios.forEach((r) =>
      r.addEventListener("change", () => {
        Carrito.fijarModalidad(r.value);
        limpiarError();
        if (r.value === "mesa") ui.inputNombre.focus();
      })
    );

    ui.inputNombre.addEventListener("input", () => {
      Carrito.fijarNombre(ui.inputNombre.value);
      if (ui.inputNombre.getAttribute("aria-invalid") === "true") limpiarError();
    });

    ui.enviar.addEventListener("click", enviarPedido);

    document.addEventListener("keydown", (e) => {
      if (!panelAbierto()) return;
      if (e.key === "Escape") cerrarCarrito();
      else if (e.key === "Tab") atraparTab(e);
    });

    ui.inputNombre.value = Carrito.nombre();
    Carrito.suscribir(sincronizarTodo);
    sincronizarTodo();
  }


  document.addEventListener("DOMContentLoaded", () => {
    renderCatalogo();
    configurarEnlacesGenerales();
    configurarPestanas();
    configurarCarrito();
  });
})();