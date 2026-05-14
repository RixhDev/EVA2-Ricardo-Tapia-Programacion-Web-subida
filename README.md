# Ricardo Tapia C. | Analista programador
## Objetivo
Procesar un catálogo de libros en HTML utilizando Cheerio desde el backend, convirtiendo los datos a JSON y entregarlos en una vista simple.

Se debe utilizar Express para crear endpoints, realizar extracción de datos con Cheerio e incorporar validaciones y manejo de errores.

Luego, realizar pruebas con Postman/Thunder Client.

## Instalación
Se ha utlizado PNPM por decisión personal que es muy similar a NPM y realiza la misma función.

Para ejecutar este proyecto: Clonar el repositorio desde GitHub y tener instalado Node.js junto con el gestor de paquetes PNPM(Casi igual a NPM). 
```
pnpm install
pnpm start
```
Como las librerías no están incluidas en el repositorio (se omite la carpeta `node_modules`), debes instalar todas las dependencias ejecutando `pnpm install` en la raíz del proyecto. Una vez completada la instalación, puedes iniciar la aplicación con `pnpm start`. 

### Ejecución
Iniciar el servidor:
```
pnpm start
```
Permite ejecutar el backend desde la dirección:
```
http://localhost:3000
```
El puerto 3000 se maneja por defecto.

### Endpoints (Mapa)
####  Ruta	                           |   Método   |	Descripción
##### /	                               |    GET	    |  Mensaje de bienvenida con ayuda.
##### /api/libros	                     |    GET	    |  Devuelve todos los libros del catálogo en JSON.
##### /api/libros/disponibles	         |    GET	    |  Devuelve solo los libros disponibles.
##### /api/libros/categoria/:categoria |    GET	    |  Filtra libros por categoría.
##### /vista	                         |    GET	    |  Devuelve el catálogo en formato HTML simple.


## Ejemplos de Request/Response
### 1. Todos los libros (GET /api/libros)
```
{
  "exito": true,
  "total": 8,
  "datos": [
    {
      "id": 1,
      "titulo": "Introducción a los Algoritmos",
      "autor": "Thomas H. Cormen",
      "estado": "disponible"
    },
    {
      "id": 2,
      "titulo": "Clean Code",
      "autor": "Robert C. Martin",
      "estado": "prestado"
    }
  ]
}
```
### 2. Libros disponibles (GET /api/libros/disponibles)
```
{
  "exito": true,
  "total": 3,
  "datos": [
    {
      "id": 1,
      "titulo": "Introducción a los Algoritmos",
      "autor": "Thomas H. Cormen",
      "estado": "disponible"
    }
  ]
}
```
### 3. Filtrar por categoría (GET /api/libros/categoria/programacion)
```
{
  "exito": true,
  "categoria": "programacion",
  "total": 2,
  "datos": [
    {
      "id": 3,
      "titulo": "JavaScript: The Good Parts",
      "autor": "Douglas Crockford",
      "estado": "disponible"
    }
  ]
}
```

### 4. Vista simple (GET /vista)
```
<h1>Catálogo de la Biblioteca</h1>
<ul>
  <li>Introducción a los Algoritmos — Thomas H. Cormen</li>
  <li>Clean Code — Robert C. Martin</li>
</ul>
```
## Pruebas con Postman/Thunder Client
Se ha realizado pruebas de cada endpoint evidenciadas en las capturas de pantalla con respuestas en JSON en Postman y la vista HTML en navegador.

Los códigos de estado HTTP se verificaron: 200 que significa exitoso, , se ha manejado como condiciones de borde 404 no encontrado y 500 para error interno del servidor.
