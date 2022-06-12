import os, { EOL } from 'os';
import path from 'path';
import fs from 'fs';
import isExist from './isExist.mjs'
import isAbsolute from './isAbsolutePath.mjs';

class cwdHandler {
  static cwd = os.homedir();

  static log(){
    console.log(`You are currently in ${this.cwd}`);
  };

  static up(){
    if(this.cwd === path.parse(this.cwd).root) return
    this.cwd = this.cwd.split(path.sep).pop().join(path.sep);
  }

  static cd(argPath){
    const newPath = isAbsolute(argPath);
    isExist(newPath);
    this.cwd = newPath;
  }

  static async ls(){
    fs.readdir(this.cwd, (err, chunk) => {
      console.log(chunk.join(EOL));
    });
  }
}

export default cwdHandler;