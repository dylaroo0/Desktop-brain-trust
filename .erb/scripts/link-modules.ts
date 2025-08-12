import fs from 'fs';
import path from 'path';
import webpackPaths from '../configs/webpack.paths';

const { srcNodeModulesPath } = webpackPaths;
const { appNodeModulesPath } = webpackPaths;

if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
