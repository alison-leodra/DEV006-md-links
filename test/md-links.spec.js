

const {
  tranformPathToAbsolute,
  returnPathIfExists,
  isPathDirectory,
  findMdFiles,
  isMdFile,
  readFile,
  getLinks,
  validateLink,
  mdLink
} = require('../index.js')


global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
  }))


describe('Ruta a absoluta', () => {
  it('Es una Funcion', () => {
    expect(typeof tranformPathToAbsolute).toBe('function');
  });

  it('Devuelve la ruta tranformada a absoluta`', () => {

    const entrada = './testFile';
    const salida = 'C:\\Users\\localhost\\Desktop\\laboratoria\\proyectoCLI\\DEV006-md-links\\testFile';


    return tranformPathToAbsolute(entrada).then(data => { expect(data).toBe(salida) })
  });

});

describe('Ruta existente', () => {
  it('Es una Funcion', () => {
    expect(typeof returnPathIfExists).toBe('function');
  });

  it('Devuelve la ruta si esta existe`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile';
    const salida = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile';

    return returnPathIfExists(entrada).then(data => { expect(data).toBe(salida) })
  });

  it('Devuelve reject si la ruta no existe`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/te';
    const salida = 'La ruta no existe';

    return returnPathIfExists(entrada).catch(data => { expect(data).toBe(salida) })
  });

});

describe('La ruta llega a un directorio', () => {
  it('Es una Funcion', () => {
    expect(typeof isPathDirectory).toBe('function');
  });

  it('Devuelve true si es un directorio`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile';
    const salida = true;

    expect(isPathDirectory(entrada)).toStrictEqual(salida);
  });

  it('Devuelve false si No un directorio`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md';
    const salida = false;

    expect(isPathDirectory(entrada)).toStrictEqual(salida);
  });

});


describe('Ruta directa a archivo md', () => {
  it('Es una Funcion', () => {
    expect(typeof findMdFiles).toBe('function');
  });

  it('devuelve la ruta directa a archivo md`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile';
    const salida = 'C:\\Users\\localhost\\Desktop\\laboratoria\\proyectoCLI\\DEV006-md-links\\testFile\\prueba01.md';

    return findMdFiles(entrada).then(data => { expect(data).toBe(salida) })
  });

});


describe('Verificacion archivo md', () => {
  it('Es una Funcion', () => {
    expect(typeof isMdFile).toBe('function');
  });

  it('Devuelve true si es un archivo md`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md';
    const salida = true;

    expect(isMdFile(entrada)).toStrictEqual(salida);
  });

  it('Devuelve false si No es un archivo md`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/pixel.png';
    const salida = false;

    expect(isMdFile(entrada)).toStrictEqual(salida);
  });

});


describe('Leer archivo md', () => {
  it('Es una Funcion', () => {
    expect(typeof readFile).toBe('function');
  });

  it('Devuelve la ruta y la data dentro del archivo md`', () => {

    const entrada = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md';
    const salida = {
      data: '# titulo prueba 01\r\n' +
        '## titulo 2 prueba01\r\n' +
        '\r\n' +
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."\r\n' +
        '\r\n' +
        '[asdasdasdsd](https://www.google.com/)\r\n' +
        '\r\n' +
        '[figma](https://www.figma.com/)\r\n' +
        '\r\n' +
        '[unsplash](https://unsplash.com/)\r\n' +
        '\r\n' +
        '[error page](https://www.siteground.es/kb/pop)\r\n',
      route: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
    };

    return readFile(entrada).then(data => { expect(data).toStrictEqual(salida) })
  });

});


describe('Extraer links', () => {
  it('Es una Funcion', () => {
    expect(typeof getLinks).toBe('function');
  });

  it('Devuelve array con links y sus propiedades`', () => {

    const entrada = {
      data: '# titulo prueba 01\r\n' +
        '## titulo 2 prueba01\r\n' +
        '\r\n' +
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."\r\n' +
        '\r\n' +
        '[asdasdasdsd](https://www.google.com/)\r\n' +
        '\r\n' +
        '[figma](https://www.figma.com/)\r\n' +
        '\r\n' +
        '[unsplash](https://unsplash.com/)\r\n' +
        '\r\n' +
        '[error page](https://www.siteground.es/kb/pop)\r\n',
      route: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
    };
    const salida = [
      {
        href: 'https://www.google.com/',
        text: 'asdasdasdsd',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://www.figma.com/',
        text: 'figma',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://unsplash.com/',
        text: 'unsplash',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://www.siteground.es/kb/pop',
        text: 'error page',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      }
    ];

    expect(getLinks(entrada)).toStrictEqual(salida);
  });

});



describe('Mostrar propiedades opcion validate true', () => {
  it('Es una Funcion', () => {
    expect(typeof validateLink).toBe('function');
  });

  it('Devuelve array con las 4 propiedades`', () => {

    const entrada = {
      href: 'https://www.google.com/',
      text: 'asdasdasdsd',
      file: 'C:\\Users\\localhost\\Desktop\\laboratoria\\proyectoCLI\\DEV006-md-links\\testFile\\prueba01.md'
    };
    const salida =
    {
      href: 'https://www.google.com/',
      text: 'asdasdasdsd',
      file: 'C:\\Users\\localhost\\Desktop\\laboratoria\\proyectoCLI\\DEV006-md-links\\testFile\\prueba01.md',
      status: 200,
      ok: 'ok'
    };

    return validateLink(entrada).then(data => { expect(data).toStrictEqual(salida) })
  });

});

describe('funcion mdLink devuelve promesa con array', () => {
  it('Es una Funcion', () => {
    expect(typeof mdLink).toBe('function');
  });

  it('Devuelve array con informacion basica en caso de validate false`', () => {

    const entradaPrimerArgumento = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md';
    const entradaSegundoArgumento = { validate: false };
    const salida = [
      {
        href: 'https://www.google.com/',
        text: 'asdasdasdsd',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://www.figma.com/',
        text: 'figma',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://unsplash.com/',
        text: 'unsplash',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      },
      {
        href: 'https://www.siteground.es/kb/pop',
        text: 'error page',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md'
      }
    ]

    return mdLink(entradaPrimerArgumento, entradaSegundoArgumento).then(data => { expect(data).toStrictEqual(salida) })
  });

  it('Devuelve array con informacion detallada en caso de validate true`', () => {

    global.fetch = jest.fn()
      .mockReturnValueOnce(Promise.resolve({ status: 200 }))
      .mockReturnValueOnce(Promise.resolve({ status: 200 }))
      .mockReturnValueOnce(Promise.resolve({ status: 200 }))
      .mockReturnValueOnce(Promise.resolve({ status: 404 }))


    const entradaPrimerArgumento = 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md';
    const entradaSegundoArgumento = { validate: true };
    const salida = [
      {
        href: 'https://www.google.com/',
        text: 'asdasdasdsd',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://www.figma.com/',
        text: 'figma',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://unsplash.com/',
        text: 'unsplash',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://www.siteground.es/kb/pop',
        text: 'error page',
        file: 'C:/Users/localhost/Desktop/laboratoria/proyectoCLI/DEV006-md-links/testFile/prueba01.md',
        status: 404,
        ok: 'fail'
      }
    ]

    return mdLink(entradaPrimerArgumento, entradaSegundoArgumento).then(data => { expect(data).toStrictEqual(salida) })
  });

});



