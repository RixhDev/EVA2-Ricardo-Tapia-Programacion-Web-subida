const express = require('express');
const cors = require('cors');
const libroRoutes = require('./src/routes/libroRoutes');
const { cargarCatalogoLocal } = require('./src/utils/parser');
const app = express();
app.use(cors());
app.use(express.json());

// Ruta raíz.
app.get('/', (req, res) => {
  res.json({ 
    exito: true,
    mensaje: "Catálogo de la biblioteca. Usa /api/libros para ver los datos.",
    ayuda: "Endpoints disponibles:\n/api/libros, /api/libros/disponibles, /api/libros/categoria/:categoria, /api/scrape"
  });
});

app.use('/api', libroRoutes);

// Ruta de visualización HTML.
app.get('/vista', (req, res) => {
  const libros = cargarCatalogoLocal();
  if (!libros || libros.length === 0) {
    return res.send("<h1>[!] Error: No se encontraron libros en el catálogo.</h1>");
  }

  let html = "<h1>Catálogo de la Biblioteca</h1><ul>";
  libros.forEach(l => {
    html += `<li>${l.titulo} — ${l.autor}</li>`;
  });
  html += "</ul>";
  res.send(html);
});


// Manejo de excepciones para rutas no encontradas.
app.use((req, res) => {
  res.status(404).json({ 
    exito: false, 
    codigo: 404,
    mensaje: "[!] Error: Ruta no encontrada.",
    ayuda: "[>] Consulte la documentación en /api."
  });
});

// Control global de errores
app.use((err, req, res, next) => {
  console.error("Error inesperado:", err);
  res.status(500).json({
    exito: false,
    codigo: 500,
    mensaje: "[!] Error inesperado en el servidor.",
    detalle: err.message,
    ayuda: "[>] Intente nuevamente más tarde."
  });
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[OK] Servidor ejecutándose en http://localhost:${PORT}`);
  console.log("[OK] Cargando catálogo local...");
  try {
    const libros = cargarCatalogoLocal();
    console.log(`[OK] Catálogo cargado con ${libros.length} libros.`);
  } catch (error) {
    console.error("[!] Error al cargar catálogo local:", error.message);
  }
});
