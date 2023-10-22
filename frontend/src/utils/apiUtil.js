import axios from 'axios';
import { toast } from 'react-toastify';
import { handleApiError } from './handleApiError';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});


api.interceptors.response.use(undefined, handleApiError);

export const apiRequest = (config, token) => {
    config = addHeaders(config, token);
    return api(config);
};

const addHeaders = (config, token) => {
    return token ? { ...config, headers: { ...config.headers, 'x-auth-token': token } } : config;
  };
  