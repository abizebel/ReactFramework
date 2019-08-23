import Api from '../utils/Api/Api';


let apiConfig = {
  headers : {
    'Content-Type': 'application/json;charset=utf-8',
  },
  mode: 'cors',//no-cors, cors, *same-origin
  cache: 'no-cache',//no-cache,reload,force-cache,only-if-cached
  fake : true,
}


class IApi {}
IApi.prototype = new Api(apiConfig);


export default IApi;