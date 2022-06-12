import os from 'os';

class osHandler{
  static eol(){
    console.log(JSON.stringify(os.EOL));
  }
  
  static cpus(){
    console.log(os.cpus());
  }

  static homedir(){
    console.log(os.homedir());
  }

  static username(){
    console.log(os.userInfo().username);
  }

  static architecture(){
    console.log(os.arch());
  }
  
}

export default osHandler;