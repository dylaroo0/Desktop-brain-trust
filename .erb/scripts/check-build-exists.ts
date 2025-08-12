import fs from 'fs';
import chalk from 'chalk';
import webpackPaths from '../configs/webpack.paths';

const mainPath = webpackPaths.distMainPath;
const rendererPath = webpackPaths.distRendererPath;

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build:main"'
    )
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build:renderer"'
    )
  );
}
