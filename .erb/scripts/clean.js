const rimraf = require('rimraf');
const process = require('process');
const { promisify } = require('util');

const rimrafAsync = promisify(rimraf);
const args = process.argv.slice(2);
const pathsToClean = args.length > 0 ? args : ['release/build', 'release/app/dist'];

Promise.all(pathsToClean.map((path) => rimrafAsync(path)))
  .then(() => console.log('🧹 Clean completed!'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
