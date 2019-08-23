
/*********************************************************
 * Plugin Name : Client Logger
 * Description : Add client logs to database
 * Author: Abbas Hosseini
 * Website : DevExpert.ir
 ********************************************************/


/**
 * @Database Sample Table
 * 
 * +----------+--------+--------------------------------------+
 * | Url      | client | client can catch current url         |
 * +----------+--------+--------------------------------------+
 * | DateTime | server | server can set time of request       |
 * +----------+--------+--------------------------------------+
 * | UserId   | server | server know whois sending requesting |
 * +----------+--------+--------------------------------------+
 * | Message  | client | client determine log message         |
 * +----------+--------+--------------------------------------+
 * | Ip       | server | server can set ip of user            |
 * +----------+--------+--------------------------------------+
 * | Level    | client | client determine log level           |
 * +----------+--------+--------------------------------------+
 */
class Log {
    /**
     * 
     * @param {String} Message is log message
     * @param {String} Level is log severity
     * @param {String} componsnt is current component 
     * @param {String} user is current user in the system
     */
    constructor (message, level , config){
        this.logLevels = {
           debug: 'debug',
           info: 'info',
           warning: 'warning',
           error: 'error',
        }

        this.colors = {
            warning : 'orange',
            info : '#42A5F5',
            success : 'green',
            error : 'red',
            data : '#ccc',

        }

        this[config.mapping.url] = window.location.href;
        this[config.mapping.message] = message;
        this.time = new Date().toLocaleTimeString();
        this.logStyle = this.createStyle(this.colors[this.logLevels[level]]);
        this.dataStyle =  this.createStyle(this.colors.data);
    }

    /**
     * @param {String} color
     */
    createStyle (color){
      return `text-align:left;
      line-height:20px;
      margin:5px 0;
      font-weight:bold;
      border:2px solid ${color};
      padding:8px;
      border-radius:5px`;
    }

}

class Logger {
  constructor(config) {
    this.count = 0;
    this.config = config;
  }
  /**
   * Log a message
   * 
   * @param {String} Message is log message
   * @param {String} Level is log severity
   * @param {Any} data is result data of ajax or so
   * @param {String} user is current user in the system
   */
  log = (message, level, data) => {

    if (!this.config.client && !this.config.server) return;

    const log = new Log(message, level, this.config);

    //Log in browser  
    if (this.config.client) { 
      console.log(`%c[${this.count++}] [${log.time}] - ${log[this.config.mapping.message]}`, log.logStyle); 
      if(data) console.log(`%c[${this.count-1}] Log Data `,log.dataStyle, data);;
    }

    //Save log in database
    if (this.config.server && this.isServerLog(log, level)) {
      this.save(log)
    }
          
  }

  /**
   * @param {Object}log
   */
  save (log){
     const res = fetch(this.config.logApi, log).then(res.json())
  }

  /**
   * @param {Object}log
   */
  isServerLog (log, level){
    for (let prop in this.config.serverLevels) {
      if (prop == level && this.config.serverLevels[prop]) {
        return true
      }   
    }
    return false
  }

  debug (){
    debugger;
  }

  /**
   * @param {String} Message is log message
   * @param {Any} data is result data of ajax or so
   */
  info (message, data){
    this.log(message, 'info', data)
  }

  /**
   * @param {String} Message is log message
   * @param {Any} data is result data of ajax or so
   */
  warn (message, data){
    this.log(message,'warning', data)
  }

  /**
   * @param {String} Message is log message
   * @param {Any} data is result data of ajax or so
   */
  error (message, data){
    this.log(message, 'error', data)
  }
   

}


export default Logger