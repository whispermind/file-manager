import fs from 'fs/promises';
import cwdHandler from './cwdHandler.mjs';
import path from 'path';
import isExist from './isExist.mjs';
import isAbsolute from './isAbsolutePath.mjs'
import { createWriteStream, createReadStream } from 'fs';

class fileHandler{

  static async cat(argPath){
    const sourcePath = isAbsolute(argPath);
    isExist(sourcePath);
    const stream = createReadStream(sourcePath, 'utf-8');
    stream.on('data', (chunk) => {
      console.log(chunk);
    })
  }

  static async add(fileName){
    const destination = path.join(cwdHandler.cwd, fileName);
    const stream = createWriteStream(destination, {flags: 'wx'});
    stream.write('', 'utf-8');
  }

  static async rn(argPath, newFileName){
    const source = isAbsolute(argPath);
    isExist(source);
    const destination = path.join(source.slice(0, source.lastIndexOf(path.sep)), newFileName);
    const rStream = createReadStream(source, 'utf-8');
    const wStream = createWriteStream(destination, 'utf-8');
    rStream.on('data', (chunk) => wStream.write(chunk));
    await fileHandler.rm(source);
  }

  static async cp(argSourcePath, argDestinationPath){
    const source = isAbsolute(argSourcePath);
    const destination = isAbsolute(argDestinationPath);
    isExist(source);
    isExist(destination);
    const destinationFilePath = path.join(destination, source.slice(source.lastIndexOf(path.sep) + 1));
    const rStream = createReadStream(source, 'utf-8');
    const wStream = createWriteStream(destinationFilePath, 'utf-8');
    rStream.on('data', (chunk) => wStream.write(chunk));
  }

  static async mv(sourcePath, destinationPath){
    await fileHandler.cp(sourcePath, destinationPath);
    await fileHandler.rm(sourcePath);
  }

  static async rm(argPath){
    const targetPath = isAbsolute(argPath);
    isExist(targetPath);
    await fs.rm(targetPath);
  }
}

export default fileHandler