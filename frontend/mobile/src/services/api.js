import axios from 'axios';

const api = axios.create({
     baseURL: 'http://eliabyteixeira.local:3333'
});

export default api;