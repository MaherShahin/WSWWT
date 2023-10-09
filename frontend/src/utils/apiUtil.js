import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.response.use(undefined, (error) => {
    if (error.response) {
        const errorData = error.response.data;

        switch (error.response.status) {
            case 400:
                if (errorData.errors[0].message) {
                    toast.error(errorData.errors[0].message);
                } else {
                    toast.error('Bad request error.');
                }
                break;
            case 401:
                toast.error('Authentication error. Please log in.');
                break;
            case 403:
                toast.error('Authorization error. You do not have permission.');
                break;
            default:
                toast.error('An unexpected error occurred.');
        }
    } else {
        toast.error('An error occurred. Please check your connection.');
    }
    return Promise.reject(error);
});

export const apiRequest = (config, token) => {
    if (token) {
        config.headers = { ...config.headers, 'x-auth-token': token };
    }

    return api(config);
};
