/*******************************************************************************************
 * @ Name : IOC Container
 * @ Author : Abbas Hosseini
 * @ Description : A simple library that support dependency injection with ES decorations
 * @ Version : 1.0.0
 * @ Last update : Friday - 2019 26 July
 ******************************************************************************************/



/**
 * IoC container class
 * 
 * @class {IOC}
 * @description : IoC container (or DI) is a design pattern that 
 * creates objects based on request and inject them when required
 */


class Ioc {
  constructor() {
    this.container = {};
    this.cache = {};
    this.mocks = {}

  }

  /**
   * Register a module to IoC container
   * 
   * @param {String} name is the module name
   * @param {Function} classConstructor is a class 
   * @returns return true when defining a module that was not previously defined
   */
  register = (ooo, classConstructor)=>{
    let name;
    if (typeof ooo === 'function') {
      name = this.extractName(ooo).toLocaleLowerCase();
      this.mocks[name] = classConstructor
    }
    else {
       name = ooo.toLowerCase();
    }

    if (this.container[name])  return;
      //throw new Error(`adding ${name} to container failed, because its already exists.`)

    this.container[name] = classConstructor;
  }




  gene
  /**
   * Resolve a injected module
   * 
   * @param {String} name is the name of requested module
   */
  resolve = (name, lifeCycle = 'Singleton') => {
    let name = name.toLowerCase();

    if (this.mocks[name]) return new this.mocks[name]();

    if (lifeCycle == 'Singleton' && this.cache[name]) return this.cache[name];

    if (!this.container[name]) return undefined;

    let instance = new this.container[name]();

    if (lifeCycle == 'Singleton') this.cache[name] = instance;
    
    return instance;
  }


  /**
   * Extract arguments of function
   * 
   * @param {Function} fn is a factory function
   * @returns {Array} args is list of function arguments
   */
  extractArgs(fn) {
    let ARROW_ARG = /^\s*[^\(]*\(\s*([^\)=>]*)\)/,
      FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
      fnText = fn.toString(),
      regResult = fnText.match(FN_ARGS) || fnText.match(ARROW_ARG),
      args = regResult[1].split(',').map((item) => {
        return item.trim();
      })
    //fix split string ''
    args = (args[0] == '') ? [] : args;
    return args;
  }

  /**
   * Extract name of function
   * 
   * @param {Function} fn is a class or function
   * @returns {String} 
   */
  extractName(fn) {
    let FN_NAME = /^\s*function\s*([^\(]*)/,
      fnText = fn.toString(),
      regResult = fnText.match(FN_NAME);
    return regResult[1]
  }

  /**
   * Inject dependency
   * 
   * @param {Object} target class prototype
   */
  inject = (target, key) => {
    let obj = this.resolve(key)
    const getter = function () {
      return obj;
    };

    Object.defineProperty(target, key, {
      get: getter,
      enumerable: true,
      configurable: true
    });
  }

  /**
   * Define class as a injectable module
   * 
   * @param {Object} target class prototype
   */
  injectable = (target) => {
    let name = this.extractName(target)
    this.register(name, target)
  }


  mock = (name, mockObject) => {
    let name = name.toLowerCase();
    this.mocks[name] = mockObject;
  }
}

var IOC = new Ioc();

export const Injectable = IOC.injectable
export const Inject = IOC.inject;
export const Register = IOC.register;
export const Resolve = IOC.resolve;
export const Mock = IOC.mock;


