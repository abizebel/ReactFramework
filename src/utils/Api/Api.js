/*********************************************************
 * Plugin Name : Api 
 * Description : Get & Post data to the server
 * Author: Abbas Hosseini
 * Website : DevExpert.ir
 ********************************************************/

import $ from 'jquery';

class Api {
  constructor(options) {
    this.requestOptions = {};
    for (let prop in options) {
      this.requestOptions[prop] = options[prop];
    }
  }

  /**
   * @param {String}url
   * @description Find route of api
   */
  getRoute(url) {
    let protocol = url.substring(0, (url.indexOf('//') - 1));
    let address = url.substring(url.indexOf('//') + 2, url.length);
    let route = address.substring(address.indexOf('/') + 1, url.length);
    return route

  }

  /**
    * 
    * @param {String} url is adress for sending request to the server
    * @param {Object} data is the information that user send to the server
    * @returns {JSON}
    * @description Post data and get result as JSON
  */
  async post(url = '', data = {}) {

    if (typeof url !== 'string'){
      return url
    }

    this.requestOptions.body = JSON.stringify(data);
    this.requestOptions.method = 'POST';
    try {
      const res = await fetch(url, this.requestOptions);
      
      if (res.ok) {
        return (res.json());
      }
      else {
        let msg = `Response code is not OK=200 for "${this.getRoute(url)}"`
        alert(msg)
      }
    }
    catch (err) {
      alert(err)
    }    

  }

  /**
   * 
   * @param {String} url is the url that use for sending request to the server
   * @returns {Promise}
   * @description Get result as JSON
   */
  async get() {
    //should be implement in future
  }

}



export default Api;