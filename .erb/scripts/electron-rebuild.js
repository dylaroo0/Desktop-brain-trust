const { execSync } = require('child_process');
const fs = require('fs');
const { dependencies } = require('../../release/app/package.json');

if (Object.keys(dependencies || {}).length === 0) {
  console.log('No dependencies to rebuild');
  process.exit(0);
}

const electronRebuildCmd =
  '../node_modules/.bin/electron-rebuild --parallel --types prod,dev,optional --module-dir .';

try {
  execSync(electronRebuildCmd, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
} catch (e) {
  console.log('Electron rebuild failed');
  console.log(e);
}
