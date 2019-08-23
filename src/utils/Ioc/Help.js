//1- Import ioc
import {Injectable, Inject, Register}  from '{DIR}/Ioc';




//2- Register in container
class Logger {
  show(){}
}
Register('logger', Logger)



//3- Inject and use
//Way 1
var logger = Require(logger);
logger.show();
//Way 2
class App {
  @inject logger;
  constructor (){
    this.logger.show()
  }
}




@Injectable 
class Logger {
  constructor(){}
  log(){}
}



