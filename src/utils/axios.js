import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-pizza-shop.herokuapp.com/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

export default instance;
