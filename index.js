const rutaSoloMD = 'C:/Users/localhost/Desktop/laboratoria/proyecto4/pruena01.md';
const rutaDirectorio = 'C:/Users/localhost/Desktop/laboratoria/proyecto4';
const rutaRelativa = 'README.md';
const rutaImagen = '"C:/Users/localhost/Desktop/Pruebas/isla.png'
const jjj = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/README.md';
const rutaRelativa2 = 'isla.png'
const rutarelativamd = 'pruena01.md'

const ruta = process.argv[2];
const path = require('path');
const fs = require('fs');
const { pathIsAbsolute, pathExist, dirOrFile } = require('./mdLinkFunctions');


const mdLinks = (ruta) => {
  //return new Promise((resolve, reject) => {
  // }
  pathExist(ruta); // no funciona bien con rutas relativas.
  const rutaNueva = pathIsAbsolute(ruta);
  console.log(rutaNueva);
  //dirOrFile(rutaNueva);
  //console.log(fs.readdirSync(ruta));

  //fs.stat metodo que retornainformacion del archivo o directotio entregado.

}

mdLinks(ruta);

// hacer funcion saber si ruta existente LISTO
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