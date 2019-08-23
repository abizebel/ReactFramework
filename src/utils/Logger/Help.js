//1- Import logger
import Logger from '{DIR}/Ioc';


//2- Instantiate a logger with your own config
let config = {
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
};

const logger = new Logger(config)

//3- Using
logger.warn ('we have a warning in system', {name:'abbas'})
logger.error ('we have a error in system')
logger.info ('we have a info in system')
if(condition) {
 logger.debug ()
}