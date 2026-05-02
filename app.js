/**
 * app.js — Lógica de la interfaz web
 */

const inputNumeros   = document.getElementById("inputNumeros");
const btnCalcular    = document.getElementById("btnCalcular");
const secResultados  = document.getElementById("resultados");
const secDetalle     = document.getElementById("detalle");
const errorBox       = document.getElementById("error");
const valMedia       = document.getElementById("valMedia");
const valMediana     = document.getElementById("valMediana");
const valDesv        = document.getElementById("valDesv");
const detN           = document.getElementById("detN");
const detMin         = document.getElementById("detMin");
const detMax         = document.getElementById("detMax");
const detRango       = document.getElementById("detRango");
const numerosDisplay = document.getElementById("numerosDisplay");

function formatear(n) {
  return parseFloat(n.toFixed(6)).toString();
}

function limpiarUI() {
  errorBox.classList.add("hidden");
  errorBox.textContent = "";
  secResultados.classList.add("hidden");
  secDetalle.classList.add("hidden");
}

function mostrarError(mensaje) {
  errorBox.textContent = "⚠  " + mensaje;
  errorBox.classList.remove("hidden");
}

function calcular() {
  limpiarUI();
  const texto = inputNumeros.value.trim();
  if (!texto) {
    mostrarError("Ingresa al menos un número antes de calcular.");
    return;
  }
  const partes  = texto.split(",");
  const numeros = partes.map((p) => {
    const n = Number(p.trim());
    return p.trim() === "" ? NaN : n;
  });
  try {
    const { media, mediana, desviacionEstandar } = obtenerEstadisticas(numeros);
    valMedia.textContent   = formatear(media);
    valMediana.textContent = formatear(mediana);
    valDesv.textContent    = formatear(desviacionEstandar);
    secResultados.classList.remove("hidden");
    const min = Math.min(...numeros);
    const max = Math.max(...numeros);
    detN.textContent     = numeros.length;
    detMin.textContent   = formatear(min);
    detMax.textContent   = formatear(max);
    detRango.textContent = formatear(max - min);
    numerosDisplay.innerHTML = numeros
      .map((n) => `<span class="num-pill">${formatear(n)}</span>`)
      .join("");
    secDetalle.classList.remove("hidden");
  } catch (error) {
    mostrarError(error.message);
  }
}

btnCalcular.addEventListener("click", calcular);
inputNumeros.addEventListener("keydown", (e) => {
  if (e.key === "Enter") calcular();
});
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    inputNumeros.value = chip.dataset.set;
    calcular();
  });
});