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
    this.mocks = {}
  }

  /**
   * Get name of dependency that can be function or string
   */
  getName = (item) => {
    if (typeof item === 'function') {
     return this.extractName(item).toLowerCase();
    }
    else {
      return item.toLowerCase();
    }
  }

  /**
   * Register a module to IoC container
   * 
   * @param {String} name is the module name
   * @param {Function} dep is a dependency class 
   * @returns return true when defining a module that was not previously defined
   */
  register = (name, dep) => {
    let nameStr = this.getName(name);

    this.container[nameStr] = dep;
  }

  /**
   * Resolve a injected module
   * 
   * @param {String} name is the name of requested module
   */
  resolve = (name) => {
    let nameStr = this.getName(name);

    if (this.mocks[nameStr]) return this.createInstance(this.mocks[nameStr]);
    if (this.container[nameStr]) return this.createInstance(this.container[nameStr]);
    if (!this.container[nameStr]) return undefined;
  }
  
  /**
   * Crate instance 
   */
  createInstance(dependency){
    try {
      return new dependency();
    } catch (err) {
      return dependency;
    }
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
    debugger
    let name = this.extractName(target)
    this.register(name, target)
  }

  /**
   * Mock a dependency
   * 
   * @param {Object} name 
   * @param {Object} mockObject class
   */
  mock = (name, mockObject) => {
    let nameStr = this.getName(name);
    this.mocks[nameStr] = mockObject;
  }

}

var IOC = new Ioc();

export const Injectable = IOC.injectable
export const Inject = IOC.inject;
export const Register = IOC.register;
export const Resolve = IOC.resolve;
export const Mock = IOC.mock;


