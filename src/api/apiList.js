import API from '../utils/Api/Api'
import posts from './posts';

export default {
  getPosts : (url, data) => API.post(posts, data)
}