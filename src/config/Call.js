import axios from 'axios';
import { decode } from '../config/crypto.js';


const header = (method, url, isAuth, data, toSendAFile) => 
{
  let options = { method }      

  options.url = url    
  data && (options.data = data)
  options.headers = {'Content-Type': toSendAFile ? 'multipart/form-data' : 'application/json' }
  axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL
  let baseurl = process.env.REACT_APP_BACKEND_URL
  if (localStorage.getItem('authInfo')) {
    
    // const data = localStorage.getItem('authInfo')? decode(localStorage.getItem('authInfo')):null
    const data2=JSON.parse(localStorage.getItem('authInfo'))
    
    // const token = (data2? data2.access_token: null);
    
    options.headers = {'app-id':'63cb679af33d417cfe2feaab',}
  }
  return options
}
  
const Header = (method, url, baseurl = false, data = null, toSendAFile = false) =>
new Promise((resolve, reject) => {
    axios(header(method, url, baseurl, data, toSendAFile))
    .then(res => resolve(res))
    .catch(error => {
      if (error.response.data.message === 'Given token not valid for any token type' ){
        localStorage.clear();
        window.location.replace('/')
      }
      reject(error)
    })
})
export default Header;