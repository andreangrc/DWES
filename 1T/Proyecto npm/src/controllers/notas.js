const readline = require('readline');
const fs = require('fs');
const { logger } = require('../utils');

const files = fs.readdirSync('./');
const arg = process.argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function crearNotas(req, res) {
  rl.question('Introduzca el nombre de la nota:\n\n', x => {
    rl.question('Introduzca el contenido de la nota:\n\n\n\n', y => {
      fs.writeFile(`${x}.txt`, y, err => {
        if (err) throw err;
        console.log('Nota Creada!');
      });

      rl.close();
    });
  });
}

function editarNotas(req, res) {
  // eslint-disable-next-line no-shadow
  const files = fs.readdirSync('./');
  console.log(files);

  // eslint-disable-next-line no-undef
  rl.question('Introduzca la nota que quiera elegir:\n\n', x => {
    console.log('\nEl archivo elegido contiene la siguiente informacion:\n\n');

    try {
      const data = fs.readFileSync(x, 'utf8');
      console.log(`${data}\n\n`);
    } catch (err) {
      console.error(err);
    }

    rl.question('Introduzca el nuevo contenido:\n\n', y => {
      fs.writeFile(x, y, err => {
        if (err) throw err;
        console.log('Contenido editado!');
        console.log('\n\n');
        console.log('El nuevo contenido es:\n\n');

        try {
          const data = fs.readFileSync(x, 'utf8');
          console.log(`${data}\n\n`);
        } catch (error) {
          console.error(error);
        }
      });

      rl.close();
    });
  });
}

function eliminarNotas(req, res) {
  // eslint-disable-next-line no-shadow
  const files = fs.readdirSync('./');
  console.log(files);

  rl.question('Introduzca la nota que quieras borrar: \n\n', x => {
    fs.unlink(x, err => {
      if (err) throw err;
      console.log('\n');
      console.log('Archivo borrado!');
    });

    rl.close();
  });
}

module.exports = {
  crearNotas,
  editarNotas,
  eliminarNotas,
};
