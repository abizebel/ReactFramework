//1- Import logger
import Api from '{DIR}/Api';


//2- Instantiate a api with your own config

let config = {
  headers : {
    'Content-Type': 'application/json;charset=utf-8',
  },
  mode: 'cors',//no-cors, cors, *same-origin
  cache: 'no-cache',//no-cache,reload,force-cache,only-if-cached
  fake : true,
}
const API = new Api(config)

//3- Using
import posts from './posts';//use js file or url for load

export default {
  getPosts : (url, data) => API.post('/api/posts', data)
}