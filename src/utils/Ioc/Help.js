//1- Import ioc
import {Injectable, Inject, Register}  from '{DIR}/Ioc';




//2- Register in container
//way1 (support class as name)
class ILogger {
  show(){}
}
class Logger {
  show(){}
}
Register(ILogger, Logger)
//way2(support string as name)
Register('logger', {warning : function(){}})
//way3 (support string as name and object as constructor)
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
