/*
C:/Users/localhost/Desktop/laboratoria/proyecto4/pruena01.md

C:/Users/localhost/Desktop/laboratoria/pruebaDirectorio/prueba02.md

C:/Users/localhost/Desktop/laboratoria/proyecto4

../../proyecto4/pruena01.md

../../pruebaDirectorio/prueba02.md

../../proyecto4

"C:/Users/localhost/Desktop/Pruebas/isla.png

README.md
*/

const route = process.argv[2];
const path = require('path');
const fs = require('fs');
const { pathIsAbsolute, pathExist, dirOrFile, readRoute } = require('./mdLinkFunctions');


const mdLinks = (ruta, options) => {
  //return new Promise((resolve, reject) => {
  // }
  // no funciona bien con rutas relativas.
  const newRoute = pathIsAbsolute(ruta);
  pathExist(newRoute);
  const kindOfElement = dirOrFile(newRoute);
  readRoute(route, kindOfElement);
}

mdLinks(route);

// hacer funcion saber si ruta existente LISTO
// hacer funcion ruta relativa o absoluta, en caso de relativa tranformar a absoluta LISTO 
// hacer funcion ruta directorio o archivo LISTO 
// hacer ruta para ver archivos dentro de directorio con extension md
// leer archivo md
// verificar o no links
// devolver promesa con array con datos.

//console.log(pathIsAbsolute(ruta));


module.exports = {
  mdLinks
};

// hay que arreglar, tira false en existente si es ruta absoluta.