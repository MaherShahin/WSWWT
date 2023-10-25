import axios from 'axios';
import ApiResponse from './ApiResponse';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});


api.interceptors.response.use(
    response => new ApiResponse(response),
    error => new ApiResponse(null, error)
);

export const apiRequest = (config, token) => {
    config = addHeaders(config, token);
    return api(config);
};

const addHeaders = (config, token) => {
    return token ? { ...config, headers: { ...config.headers, 'x-auth-token': token } } : config;
  };
