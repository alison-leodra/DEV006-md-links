
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const route = process.argv[2];
const option = JSON.parse(process.argv[3]);
const path = require('path');
const fs = require('fs');
const { promises } = require('dns');
const md = require('markdown-it')({
  html: true,
  linkify: true,
});

const tranformPathToAbsolute = (route) => {
  return new Promise((resolve, reject) => {

    if (path.isAbsolute(route)) {
      resolve(route)
    }
    else {
      const newRoute = path.resolve(route);
      resolve(newRoute)
    }
  })
}

const returnPathIfExists = (route) => {
  return new Promise((resolve, reject) => {

    const exist = fs.existsSync(route);
    if (exist) {
      resolve(route);
    }
    reject("La ruta no existe");

  })
}

const isPathDirectory = (route) => {

  if (fs.lstatSync(route).isDirectory()) {
    return true;
  }
  return false;
}

const findMdFiles = (route) => {
  return new Promise((resolve, reject) => {
    const dirContent = fs.readdirSync(route);
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
        resolve({
          data: data,
          route: route
        })
      }
    }
    )
  })
}


const getLinks = (data) => {

  let linkPropertiesNoValidate = [];

  const fileMdToHTML = md.render(data.data);

  const { document } = new JSDOM(fileMdToHTML).window

  const allLinks = document.querySelectorAll('a')

  allLinks.forEach(link => linkPropertiesNoValidate.push({
    href: link.href,
    text: link.textContent,
    file: data.route
  }));
  return linkPropertiesNoValidate
}

const validateLink = (link) => {

  const promiseValidateLink = new Promise((resolve, reject) => {
    fetch(link.href)
      .then(response => {
        if (response.status >= 100 && response.status <= 399) {
          resolve({
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            ok: 'ok'
          })
        }
        resolve({
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          ok: 'fail'
        })
      })
      .catch(err => {
        resolve({
          href: link.href,
          text: link.text,
          file: link.file,
          status: "ENOTFOUND - fetch failed",
          ok: 'fail'
        });
      })
  })
  return promiseValidateLink
}

function mdLink(route, option) {
  return new Promise((resolve, reject) => {

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
        const links = getLinks(data);
        if (option.validate) {
          const linkPromises = links.map(link => validateLink(link))
          return Promise.all(linkPromises);
        }
        return links;
      })
      .then(promises => {
        resolve(promises)
      })
      .catch(cause => {
        reject(`la razon de fallo fue: ${cause}`);
      })

  })
}

mdLink(route, option)
  .then(promise => console.log(promise))
  .catch(cause => console.log(cause))

