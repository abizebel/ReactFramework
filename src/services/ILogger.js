import Logger from '../utils/Logger/Logger';

let loggerConfig = {
  logApi: 'api/addApi',
  server: false,
  client: true,  
  serverLevels: {
    info: true,
    warning: false,
    error: true,
  },
  mapping: {
    message: 'Message',
    url: 'Url',
  }
}

class ILogger {
  info(){}
  error(){}
  info(){}
  debug(){}
}




ILogger.prototype = new Logger(loggerConfig);


export default ILogger;