import axios from 'axios';
const BASE_URL = 'https://api.mangadex.org/' ; 
// Replace with your API base URL
export default axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type':'application/json',
       
    },
    withCredentials:true

})