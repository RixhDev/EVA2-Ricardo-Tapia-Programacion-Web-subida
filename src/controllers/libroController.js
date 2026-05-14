const servicio = require('../services/libroService');
const { cargarCatalogoLocal } = require('../utils/parser');

function getTodos(req, res) {
  const datos = servicio.obtenerTodos();
  res.json({ exito: true, total: datos.length, datos });
}

function getDisponibles(req, res) {
  const datos = servicio.obtenerDisponibles();
  res.json({ exito: true, total: datos.length, datos });
}

function getPorCategoria(req, res) {
  const categoria = req.params.categoria;
  if (!categoria) {
    return res.status(400).json({ 
        exito: false, 
        mensaje: "[!] Alerta: Debe indicar una categoría.",
        ejemplo: "/api/libros/categoria/programacion"
    });
  }

  try {
    const datos = servicio.obtenerPorCategoria(categoria);
    if (datos.length === 0) {
        return res.status(404).json({ 
            exito: false,
            codigo: "404", 
            mensaje: `[!] No se encontraron libros en: "${categoria}".` ,
            ayuda: "[>] Verifique la categoría o revise el catálogo completo en /api/libros."
        });
    }

    res.json({ exito: true, categoria, total: datos.length, datos });
    } catch (error) {
        res.status(500).json({ 
            exito: false, 
            mensaje: "[!] Error al procesar la solicitud.",
            detalle: error.message,
            ayuda: "[>] Intente nuevamente más tarde." 
        });
    }
}

module.exports = { getTodos, getDisponibles, getPorCategoria };
function scrapeDemo(req, res) {
  try {
    const libros = cargarCatalogoLocal();
    const datos = libros.map(l => ({ titulo: l.titulo, autor: l.autor }));
    res.json({ exito: true, total: datos.length, datos });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "[!] Error al procesar catálogo." });
  }
}
module.exports = { getTodos, getDisponibles, getPorCategoria, scrapeDemo };
