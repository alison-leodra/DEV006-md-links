const path = require('path');
const fs = require('fs');

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

//funcion es directorio o no.
//fs.stat metodo que retornainformacion del archivo o directotio entregado.
function dirOrFile(route) {
  fs.stat(route, (err, stats) => {
    if (!err) {
      //const dirFile = (stats.isDirectory()) ? true : false;

      if (stats.isDirectory()) {
        console.log('Es un direcotorio ' + stats.isDirectory())
        const dirContent = fs.readdirSync(route);
        console.log(dirContent);
      }
      else if (stats.isFile()) {
        console.log('Es un archivo ' + stats.isFile());
        // const fileContent ;
        //console.log(fileContent);
      };
    }
    else
      throw err;
  });
}


module.exports = {
  pathIsAbsolute,
  pathExist,
  dirOrFile,
}

