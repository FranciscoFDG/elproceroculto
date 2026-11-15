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
