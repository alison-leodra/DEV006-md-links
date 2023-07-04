const path = require('path');
const fs = require('fs');
const md = require('markdown-it')({
  html: true,
  linkify: true,
});
const { rejects } = require('assert');
const { error, log } = require('console');

//funcion verificar existencia de ruta, retorna true si el archivo existe
function pathExist(route) {

  console.log("Existente: ", fs.existsSync(route));
  return fs.existsSync(route)
}

//Funcion absoluta o relativa, si es relativa se tranforma a absoluta, retorna la ruta absoluta.
function pathIsAbsolute(route) {
  if (path.isAbsolute(route)) {
    console.log("La ruta es absoluta");
    return route;
  }
  else {
    const newRoute = path.resolve(route);
    console.log("La ruta relativa, ahora es absoluta ");
    return newRoute;
  }
}

//funcion directorio o archivo, retorna true si es directorio y false si es archivo.
function dirOrFile(route) {

  try {
    if (fs.lstatSync(route).isDirectory()) {
      console.log("Es directorio");
      return true;
    }
    else {
      console.log("Es archivo");
      return false;
    }
  }
  catch (err) {
    console.log("error");
  }

}

//funcion sacar archivo md de directorio, retorna la ruta directa hacia el archivo a examinar.
function extractPathMd(typeOf, route) {
  if (typeOf) {
    const dirContent = fs.readdirSync(route);
    console.log("llego a extraer archivos md");
    const dirFile = dirContent.filter(path => path.includes(".md"));
    const newPath = dirFile.map(element => path.join(route, element))
    return newPath[0];
  }
  else {

    return route;
  }
}


//funcion archivo es md, devuelve true si es un archivo md.
function mdFile(route) {
  const fileExt = path.extname(route);
  console.log("Extension archivo: ", fileExt);

  try {
    if (fileExt === ".md") {
      return true
    }
    else {
      throw error;
    }
  } catch (error) {
    console.error("El archivo no es markdown")

  }
}


// debe retornar un array con los links encontrados dentro del archivo md.
function linksFounds(route, fileExt) {

  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (err, data) => {
      if (err) {
        console.log('error: ', err);
        reject(err)
      } else {
        // console.log(md.linkify.match(data));
        const linkExtracted = md.linkify.match(data);
        const arrayLinks = linkExtracted.map(element => element.url);
        console.log(arrayLinks);

        /* pasar parte de esta funcionalidad a funcion linkProperties.
        fetch(arrayLinks[0])
          .then(response => {
            console.log('Status: ', response.status);
    
          })
          .catch(err => {
            console.log("Resolver esto, al ingresar link inexistente");
          })
          */
        resolve(arrayLinks)
      }
    }
    )
  })

}


function linkProperties(route, arrayLinks) {
  const linksProps = [];

  const listo = arrayLinks.map(element => {
    new linkContructor(element.value)
  });
  console.log(listo);
}

class linkContructor {
  constructor(href) {
    this.href = href;
  }
}



module.exports = {
  pathIsAbsolute,
  pathExist,
  dirOrFile,
  mdFile,
  extractPathMd,
  linkProperties,
  linksFounds,
}

