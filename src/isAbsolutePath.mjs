import path from 'path';
import cwdHandler from './cwdHandler.mjs';

function isAbsolute(argPath){
  return path.isAbsolute(argPath) ? argPath : path.join(cwdHandler.cwd, argPath);
}

export default isAbsolute