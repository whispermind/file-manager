import cwdHandler from './cwdHandler.mjs';
import compressor from './zipHandler.mjs';
import fileHandler from './fsHandler.mjs';
import osHandler from './osHandler.mjs';

class commandHandler{
  static operationErrorMessage = 'Operation failed';
  static inputErrorMessage = 'Invalid input';

  static async dispatch(line){
    const trimmed = line.trim().toLowerCase();
    const spaceIndex = trimmed.indexOf(' ');
    const action = spaceIndex >= 0 ? trimmed.slice(0, spaceIndex) : trimmed;
    const args = spaceIndex >= 0 ? trimmed.slice(trimmed.indexOf(' ') + 1).split(' ') : null;

    if(!commandHandler[action]) {
      if(action === '.exit') {
        commandHandler.exit();
      }
      console.log(commandHandler.inputErrorMessage);
      return
    }

    try{
      await commandHandler[action](args);
    }
    catch{
      console.log(commandHandler.operationErrorMessage)
    }

    cwdHandler.log();
  }

  static async cd(args){
    await cwdHandler.cd(args.toString());
  }

  static async ls(){
    await cwdHandler.ls();
  }

  static async up(){
    await cwdHandler.up();
  }

  static async hash(args){
    const path = args[0];
    const data = await fs.readFile(path);
    console.log(crypto.createHash('sha256').update(data).digest('hex'));
  }

  static async compress(args){
    const source = args[0];
    const destination = args[1];
    await compressor.compress(source, destination);
  }

  static async decompress(args){
    const source = args[0];
    const destination = args[1];
    await compressor.decompress(source, destination);
  }

  static async cat(args){
    const path = args[0];
    await fileHandler.cat(path);
  }

  static async add(args){
    const fileName = args[0];
    await fileHandler.add(fileName);
  }

  static async rn(args){
    const path = args[0];
    const newPath = args[1];
    await fileHandler.rn(path, newPath);
  }

  static async cp(args){
    const source = args[0];
    const destination = args[1];
    await fileHandler.cp(source, destination);
  }

  static async mv(args){
    const path = args[0];
    const newPath = args[1];
    await fileHandler.mv(path, newPath);
  }

  static async rm(args){
    const path = args[0];
    await fileHandler.rm(path);
  }
  
  static async os(args){
    const method = args[0].slice(2);
    if(osHandler[method]) {
      osHandler[method]();
    }
    else{
      throw new Error('operation failed');
    }
  }

  static exit(){
    process.exit();
  }
}

export default commandHandler;