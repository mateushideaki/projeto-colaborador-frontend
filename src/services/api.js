import axios from 'axios';
import { getToken, logout } from "./auth";

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (!error.response) {
        logout();
        const requestConfig = error.config;
        return axios(requestConfig);
    }
    if (error.response.status === 401) {
        logout();
        const requestConfig = error.config;
        return axios(requestConfig);
    }
    return Promise.reject(error);
});

export default api;