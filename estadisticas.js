/**
 * @module Estadisticas
 */

function validarArreglo(numeros) {
  if (!Array.isArray(numeros)) {
    throw new TypeError("El argumento debe ser un arreglo.");
  }
  if (numeros.length === 0) {
    throw new RangeError("El arreglo no puede estar vacío.");
  }
  if (!numeros.every((n) => typeof n === "number" && isFinite(n))) {
    throw new TypeError("Todos los elementos deben ser números finitos.");
  }
}

function obtenerMedia(numeros) {
  validarArreglo(numeros);
  const total = numeros.reduce((acum, n) => acum + n, 0);
  return total / numeros.length;
}

function obtenerMediana(numeros) {
  validarArreglo(numeros);
  const ordenados = [...numeros].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);
  const esPar = ordenados.length % 2 === 0;
  return esPar
    ? (ordenados[mitad - 1] + ordenados[mitad]) / 2
    : ordenados[mitad];
}

function obtenerDesviacionEstandar(numeros) {
  validarArreglo(numeros);
  const media = obtenerMedia(numeros);
  const varianza =
    numeros.reduce((acum, n) => acum + Math.pow(n - media, 2), 0) /
    numeros.length;
  return Math.sqrt(varianza);
}

function obtenerEstadisticas(numeros) {
  return {
    media: obtenerMedia(numeros),
    mediana: obtenerMediana(numeros),
    desviacionEstandar: obtenerDesviacionEstandar(numeros),
  };
}