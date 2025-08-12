const chalk = require('chalk');

const port = process.env.PORT || '1212';

// Simple port check without detect-port dependency
const net = require('net');

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(port, (err) => {
      if (err) {
        reject(new Error(
          chalk.whiteBright.bgRed.bold(
            `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
          )
        ));
      } else {
        server.close(() => {
          resolve(port);
        });
      }
    });

    server.on('error', (err) => {
      reject(new Error(
        chalk.whiteBright.bgRed.bold(
          `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm start`
        )
      ));
    });
  });
}

checkPort(port)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
