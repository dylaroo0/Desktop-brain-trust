const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { dependencies } = require('../../release/app/package.json');

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies);
  const nativeDeps = fs
    .readdirSync('node_modules')
    .filter((folder) => fs.existsSync(path.join('node_modules', folder, 'binding.gyp')))
    .filter((folder) => dependenciesKeys.includes(folder));

  if (nativeDeps.length === 0) {
    process.exit(0);
  }

  try {
    // Find the reason for why the dependency is installed. If it is installed
    // because of a devDependency then that is okay. Warn when it is installed
    // because of a dependency
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString()
    );
    const rootDependencies = Object.keys(dependenciesObject);
    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      nativeDeps.includes(rootDependency)
    );

    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;
      console.log(`
${chalk.whiteBright.bgYellow.bold(
  `The following native ${plural ? 'dependencies' : 'dependency'} is installed as a dependency:`
)}

${chalk.bold(filteredRootDependencies.join('\n'))}

${chalk.whiteBright.bgYellow.bold(
  'Native dependencies should not be installed as dependencies. Instead, the user should install the native dependency.'
)}

${chalk.whiteBright.bgYellow.bold(
  'Read more about native dependencies at https://www.electronjs.org/docs/tutorial/using-native-node-modules'
)}

`);

      process.exit(1);
    }
  } catch (e) {
    console.log('Native dependencies could not be checked');
  }
}
