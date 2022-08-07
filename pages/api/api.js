import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-doacao-pc-app-master.herokuapp.com',
  headers: { 'content-type': 'application/json; charset=utf-8' },
});

export default api;