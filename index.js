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
const { promises } = require('dns');
const { mdFile } = require('./mdLinkFunctions');
const md = require('markdown-it')({
  html: true,
  linkify: true,
});
/*
const { pathIsAbsolute, pathExist, dirOrFile, mdFile, extractPathMd, linkProperties, linksFounds } = require('./mdLinkFunctions');


const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    // }
    //funcion Ruta absoluta o relativa
    let newRoute = pathIsAbsolute(ruta);

    //funcion Ruta existente
    pathExist(newRoute);

    //funcion Directorio o archivo boolean
    const typeOf = dirOrFile(newRoute);
    //Si es directorio sacar solo archivo ext md.

    newRoute = extractPathMd(typeOf, route);// esta devuelve ruta del archivo md del directorio o ruta solo de archivo.
    console.log("Ruta del archivo encontrado: ", newRoute);

    //leer ext archivo.
    const fileExt = mdFile(newRoute); // devuelve true si el archivo encontrado es md.

    linksFounds(newRoute, fileExt).then(value => {
      resolve(value)
    })// retorna array con los links dentro del archivo md.
  })
}

mdLinks(route).then(value => console.log(`valor > ${value}`));


// verificar o no links
// devolver promesa con array con datos.

//console.log(pathIsAbsolute(ruta));


module.exports = {
  mdLinks
};

*/


const tranformPathToAbsolute = (route) => {
  return new Promise((resolve, reject) => {
    //implementar logica para saber si es absoluta o no la ruta.
    if (path.isAbsolute(route)) {
      console.log("La ruta es absoluta");
      resolve(route)
    }
    else {
      const newRoute = path.resolve(route);
      console.log("La ruta relativa, ahora es absoluta ");
      resolve(newRoute)
    }
  })
}

const returnPathIfExists = (route) => {
  return new Promise((resolve, reject) => {
    //implementar logica para saber si la ruta existe.
    const exist = fs.existsSync(route);
    if (exist) {
      resolve(route);
    }
    reject("La ruta no existe");

  })
}

const isPathDirectory = (route) => {

  if (fs.lstatSync(route).isDirectory()) {
    console.log("Es directorio");
    return true;
  }
  return false;
}

const findMdFiles = (route) => {
  return new Promise((resolve, reject) => {
    const dirContent = fs.readdirSync(route);
    console.log("llego a extraer archivos md");
    const dirFile = dirContent.filter(path => path.includes(".md"));
    const newPath = dirFile.map(element => path.join(route, element))
    resolve(newPath[0])
  }
  )
}

const isMdFile = (route) => {
  if (path.extname(route) === ".md") {
    return true
  }
  else {
    return false
  }
}

const readFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    }
    )
  })
}

const getLinks = (data) => {
  //const properties = arrayLinks.map(element => new linkProperties(element, element.text))
  const linkExtracted = md.linkify.match(data);
  const arrayLinks = linkExtracted.map(element => ({
    href: element.url,
    text: element.text
  }));

  //const properties = arrayLinks.map(element => ({
  //  href: element,
  //  text: element.text
  //}))
  return arrayLinks
}

tranformPathToAbsolute(route)
  .then(result => {
    return returnPathIfExists(result)
  })
  .then(path => {
    if (isPathDirectory(path)) {
      return findMdFiles(path)
    }
    return Promise.resolve(route)
  })
  .then(route => {
    if (isMdFile(route)) {
      return readFile(route)
    }
    return Promise.reject("El archivo no es markdown")
  })
  .then(data => {
    console.log(getLinks(data));
  })
  .catch(cause => {
    console.log(`la razon de fallo fue: ${cause}`);
  })