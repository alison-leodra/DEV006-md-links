const rutaSoloMD = 'C:/Users/localhost/Desktop/laboratoria/proyecto4/pruena01.md';
const rutaDirectorio = 'C:/Users/localhost/Desktop/laboratoria/proyecto4';
const rutaRelativa1 = '../../proyecto4/pruena01.md';
const rutarelativa2 = '../../proyecto4';
const rutaImagen = '"C:/Users/localhost/Desktop/Pruebas/isla.png'
const relativa3 = 'README.md';


const route = process.argv[2];
const path = require('path');
const fs = require('fs');
const { pathIsAbsolute, pathExist, dirOrFile } = require('./mdLinkFunctions');


const mdLinks = (ruta, options) => {
  //return new Promise((resolve, reject) => {
  // }
  // no funciona bien con rutas relativas.
  const rutaNueva = pathIsAbsolute(ruta);
  pathExist(rutaNueva);
  dirOrFile(rutaNueva);


  //fs.stat metodo que retornainformacion del archivo o directotio entregado.

}

mdLinks(route);

// hacer funcion saber si ruta existente LISTOcd
// hacer funcion ruta relativa o absoluta, en caso de relativa tranformar a absoluta LISTO ARREGLAR
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