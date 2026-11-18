// EL PRÓCER OCULTO — interacciones mínimas

// Menú en pantallas chicas
(function () {
  var nav = document.querySelector(".nav");
  var boton = document.querySelector(".nav__menu");
  if (!nav || !boton) return;
  boton.addEventListener("click", function () {
    var abierta = nav.classList.toggle("abierta");
    boton.setAttribute("aria-expanded", abierta ? "true" : "false");
  });
  nav.querySelectorAll(".nav__links a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("abierta");
      boton.setAttribute("aria-expanded", "false");
    });
  });
})();

// Si todavía no existe la foto de un recorte, se muestra el espacio reservado
document.querySelectorAll(".cut--foto img").forEach(function (img) {
  function falta() {
    img.closest(".cut--foto").classList.add("sin-foto");
    img.remove();
  }
  if (img.complete && img.naturalWidth === 0) falta();
  else img.addEventListener("error", falta);
});

// Índice de capítulos: marca el capítulo que se está leyendo
(function () {
  var enlaces = document.querySelectorAll(".indice__lista a");
  if (!enlaces.length || !("IntersectionObserver" in window)) return;
  var porId = {};
  enlaces.forEach(function (a) { porId[a.getAttribute("href").slice(1)] = a; });
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      enlaces.forEach(function (a) { a.classList.remove("activo"); });
      if (porId[e.target.id]) porId[e.target.id].classList.add("activo");
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  document.querySelectorAll(".cap").forEach(function (s) { obs.observe(s); });
})();

// Línea del tiempo: rueda, arrastre, flechas, progreso y etapa activa
(function () {
  var pista = document.querySelector(".tl__pista");
  if (!pista) return;
  var barra = document.querySelector(".tl__progreso span");
  var flechas = document.querySelectorAll(".tl-flecha");
  var chips = document.querySelectorAll(".tl-chips a");
  var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function max() { return pista.scrollWidth - pista.clientWidth; }

  function actualizar() {
    var m = max(), x = pista.scrollLeft;
    if (barra) barra.style.width = (m > 0 ? (x / m) * 100 : 100) + "%";
    if (flechas[0]) flechas[0].disabled = x <= 2;
    if (flechas[1]) flechas[1].disabled = x >= m - 2;
    var marcas = pista.querySelectorAll(".tl-etapa"), activa = null;
    var borde = pista.getBoundingClientRect().left + pista.clientWidth * 0.35;
    marcas.forEach(function (mk) { if (mk.getBoundingClientRect().left <= borde) activa = mk.id; });
    chips.forEach(function (c) { c.classList.toggle("activo", c.getAttribute("href") === "#" + activa); });
  }
  pista.addEventListener("scroll", actualizar, { passive: true });
  window.addEventListener("resize", actualizar);
  actualizar();

  // rueda vertical -> desplazamiento horizontal (solo mientras haya recorrido)
  pista.addEventListener("wheel", function (ev) {
    if (Math.abs(ev.deltaY) <= Math.abs(ev.deltaX)) return;
    var x = pista.scrollLeft, m = max();
    if ((ev.deltaY > 0 && x >= m - 1) || (ev.deltaY < 0 && x <= 1)) return;
    ev.preventDefault();
    pista.scrollLeft = x + ev.deltaY;
  }, { passive: false });

  // arrastrar con el mouse
  var abajo = false, movio = false, x0 = 0, s0 = 0;
  pista.addEventListener("pointerdown", function (ev) {
    if (ev.pointerType !== "mouse" || ev.button !== 0) return;
    abajo = true; movio = false; x0 = ev.clientX; s0 = pista.scrollLeft;
  });
  window.addEventListener("pointermove", function (ev) {
    if (!abajo) return;
    var dx = ev.clientX - x0;
    if (!movio && Math.abs(dx) > 5) { movio = true; pista.classList.add("arrastrando"); }
    if (movio) pista.scrollLeft = s0 - dx;
  });
  window.addEventListener("pointerup", function () {
    abajo = false;
    setTimeout(function () { pista.classList.remove("arrastrando"); }, 0);
  });

  function ir(x) { pista.scrollTo({ left: x, behavior: reducir ? "auto" : "smooth" }); }
  flechas.forEach(function (b) {
    b.addEventListener("click", function () {
      ir(pista.scrollLeft + Number(b.dataset.dir) * pista.clientWidth * 0.8);
    });
  });
  chips.forEach(function (c) {
    c.addEventListener("click", function (ev) {
      var destino = document.querySelector(c.getAttribute("href"));
      if (!destino) return;
      ev.preventDefault();
      var col = destino.closest(".tl-anio");
      var izq = parseFloat(getComputedStyle(pista.querySelector(".tl__anios")).paddingLeft) || 0;
      ir(col.offsetLeft - izq);
    });
  });
})();
