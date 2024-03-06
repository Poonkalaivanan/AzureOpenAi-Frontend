import axios from 'axios';
class AdminService {

    ask(obj){
        return axios.post("/ask",obj);
    }
}
export default new AdminService();


const BASE_URL="YOUR_BACKEND_URL";

axios.interceptors.request.use(
    
  config => {
    config.url = BASE_URL+config.url
    return config
  },
  error => {
    Promise.reject(error)
  }
)