import {createGzip, createUnzip} from 'zlib';
import { createReadStream, createWriteStream } from 'fs'
import isAbsolute from './isAbsolutePath.mjs';
import isExist from './isExist.mjs';
import { pipeline } from 'stream/promises';
import path from 'path';

class compressor{

  static async compress(sourcePath, destinationPath){
    const source = isAbsolute(sourcePath);
    const destination = isAbsolute(destinationPath);
    const zip = createGzip();
    isExist(source);
    isExist(destination);
    const destinationFile = path.join(destination, source.slice(source.lastIndexOf(path.sep))) + '.gz';
    const rStream = createReadStream(source);
    const wStream = createWriteStream(destinationFile);
    await pipeline(rStream, zip, wStream);
  }

  static async decompress(sourcePath, destinationPath){
    const source = isAbsolute(sourcePath);
    const destination = isAbsolute(destinationPath);
    const unzip = createUnzip();
    isExist(source);
    isExist(destination);
    const destinationFile = path.join(destination, source.slice(0, source.lastIndexOf('.')).slice(source.lastIndexOf(path.sep)));
    const rStream = createReadStream(source);
    const wStream = createWriteStream(destinationFile);
    await pipeline(rStream, unzip, wStream);
  }
}

export default compressor