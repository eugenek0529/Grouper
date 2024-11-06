import axios from 'axios';

// Configure base Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,            // Enables sending cookies with requests
});

export default api;