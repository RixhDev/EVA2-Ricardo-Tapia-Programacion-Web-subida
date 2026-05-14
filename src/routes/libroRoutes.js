// Rutas para libros
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/libroController');

router.get('/libros', controlador.getTodos);
router.get('/libros/disponibles', controlador.getDisponibles);
router.get('/libros/categoria/:categoria', controlador.getPorCategoria);
router.get('/scrape', controlador.scrapeDemo);

// Exportam el router para usarlo en app.js
module.exports = router;
