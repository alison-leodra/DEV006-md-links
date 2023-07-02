const path = require('path');
const fs = require('fs');
const md = require('markdown-it')({
  html: true,
  linkify: true,
});
const { rejects } = require('assert');
const { error } = require('console');

//funcion verificar existencia de ruta.
function pathExist(route) {

  console.log("Existente: ", fs.existsSync(route));
  return fs.existsSync(route)
}

//Funcion absoluta o relativa, si es relativa se tranforma a absoluta.
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

//funcion directorio o archivo
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

//funcion sacar archivo md.
function extractFiles(typeOf, route) {
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

//hacer funcion en que entre el dir o file y ahi sacar una ruta definitiva si entra en el primer if o segundo if.

//funcion leer archivo.
//seguir viendo markdown it libreria.
function readRoute(route) {
  const fileExt = path.extname(route);
  console.log("llego a leer archivo");
  console.log(fileExt);

  try {
    if (fileExt === ".md") {
      fs.readFile(route, 'utf-8', (err, data) => {
        if (err) {
          console.log('error: ', err);
        } else {
          console.log(md.linkify.match(data));
        }
      })
    }
    else {
      throw error;
    }

  } catch (error) {
    console.error("El archivo no es markdown")

  }







}


module.exports = {
  pathIsAbsolute,
  pathExist,
  dirOrFile,
  readRoute,
  extractFiles,
}

