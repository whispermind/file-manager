import process, { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline';
import cwdHandler from './src/cwdHandler.mjs'
import commandHandler from './src/controller.mjs'
import userGreetings from './src/greetingsHandler.mjs';

class cliApp{
  constructor(){
    const userNameArg = process.argv.slice(2)[0];
    const userName = userNameArg.slice(userNameArg.indexOf('=') + 1);
    process.on('exit', () => this.greetingsHandler.farewell());
    this.greetingsHandler = new userGreetings(userName);
    this.greetingsHandler.greetings();
    this.rl = createInterface({ input, output });
    this.rl.on('line', commandHandler.dispatch);
    cwdHandler.log();
  }
}

export default new cliApp()
