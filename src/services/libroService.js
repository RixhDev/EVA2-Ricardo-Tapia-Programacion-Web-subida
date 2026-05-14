const { cargarCatalogoLocal } = require('../utils/parser');
const libros = cargarCatalogoLocal();

// Escribimos las funciones con snake case con las que el controlador interactuará.
function obtenerTodos() {
  return libros;
}

function obtenerDisponibles() {
  return libros.filter(l => l.estado === 'disponible');
}

function obtenerPorCategoria(categoria) {
  return libros.filter(l => l.categoria?.toLowerCase() === categoria.toLowerCase());
}
// Exportar las funciones.
module.exports = { obtenerTodos, obtenerDisponibles, obtenerPorCategoria };
