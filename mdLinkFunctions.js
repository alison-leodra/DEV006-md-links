const path = require('path');
const fs = require('fs');
const { rejects } = require('assert');

//funcion verificar existencia de ruta.
function pathExist(route) {
  console.log("Existente: ", fs.existsSync(route)) // Se puede usar esta?
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

  /*
  fs.stat(route, (err, stats) => {
    if (!err) {
      if (stats.isDirectory()) {
        console.log('Es un direcotorio ')
      }
      else {
        console.log('Es un archivo ');
      };
    }
    else {
      throw err;
    }
  });
  */

}

//funcion sacar archivo md
/*
function extractFiles (route){
      const dirContent = fs.readdirSync(route);
    console.log("llego a leer directorio");
    console.log(dirContent);
    //const newPath = path.join(route,element)
    dirContent.forEach(element => console.log(path.join(route, element)));
}
*/

//funcion leer archivo o directorio dependiendo de el resultado booleano.
function readRoute(route, type) {
  if (type) {
    const dirContent = fs.readdirSync(route);
    console.log("llego a leer directorio");
    console.log(dirContent);
    //const newPath = path.join(route,element)
    dirContent.forEach(element => console.log(path.join(route, element)));
  }
  else {
    const fileExt = path.extname(route);
    console.log("llego a leer archivo");
    console.log(fileExt);
  }
}


module.exports = {
  pathIsAbsolute,
  pathExist,
  dirOrFile,
  readRoute,
}

