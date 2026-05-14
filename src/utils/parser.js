const fs = require('fs');
const cheerio = require('cheerio');
// Cargar el catálogo local desde el HTML (Aquí se usa Cheerio)
function cargarCatalogoLocal() {
  const html = fs.readFileSync('./public/catalogo.html', 'utf8');
  const $ = cheerio.load(html);
// Extraer la carga de libros del HTML.
  const libros = [];
  $('.libro').each((i, elem) => {
    libros.push({
      id: i + 1,
      titulo: $(elem).find('.titulo').text().trim(),
      autor: $(elem).find('.autor').text().trim(),
      estado: $(elem).find('.estado').text().trim().toLowerCase()
    });
  });
  return libros;
}

module.exports = { cargarCatalogoLocal };
