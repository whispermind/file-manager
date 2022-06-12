import fs from 'fs';

function isExist(path){
  if(!fs.existsSync(path)) throw new Error('EOENT');
  return true;
}

export default isExist