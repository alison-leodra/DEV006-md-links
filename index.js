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
const md = require('markdown-it')({
  html: true,
  linkify: true,
});
const { pathIsAbsolute, pathExist, dirOrFile, readRoute, extractFiles } = require('./mdLinkFunctions');


const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    // }
    //funcion Ruta absoluta o relativa
    let newRoute = pathIsAbsolute(ruta);

    //funcion Ruta existente
    pathExist(newRoute);

    //funcion Directorio o archivo boolean
    const typeOf = dirOrFile(newRoute);
    console.log(typeOf);
    //Si es directorio sacar solo archivo ext md.

    newRoute = extractFiles(typeOf, route);
    console.log(newRoute); // esta devuelve ruta del archivo md
    //leer archivo ext md.
    const arrayLinks = readRoute(newRoute); // esta devuelve array con link encontrados.
  })
}

mdLinks(route);


// verificar o no links
// devolver promesa con array con datos.

//console.log(pathIsAbsolute(ruta));


module.exports = {
  mdLinks
};

