class userGreetings{
  userName = 'Danny DeVito';
  
  constructor(userName){
    this.userName = userName || this.userName;
  }
  
  greetings(userName){
    console.log(`Welcome to the File Manager, ${this.userName}!`);
  }
  
  farewell(userName){
    console.log(`Thank you for using File Manager, ${this.userName}!`);
  }
}

export default userGreetings;