import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smartfridge-backend.herokuapp.com/',
});

export default api;
