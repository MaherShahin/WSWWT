import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});



function isValidationErrorResponse(data) {
    return Array.isArray(data.errors) && typeof data.errors[0]?.msg === 'string';
}


function isGenericErrorResponse(data) {
    return typeof data.message === 'string';
}

api.interceptors.response.use(undefined, (error) => {
    if (error.response) {
        const errorData = error.response.data;
        console.log(errorData);

        switch (error.response.status) {
            case 400:
                if (isValidationErrorResponse(errorData)) {
                    toast.error(`${errorData.errors[0].msg}`);
                } else if (isGenericErrorResponse(errorData)) {
                    toast.error(errorData.message);
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
            case 404:
            case 500:
                break; 
            default:
                toast.error('An unexpected error occurred.');
                break;
        }
    } else {
        toast.error('An error occurred. Please check your connection.');
    }
    return Promise.reject(error);
});

export const useApi = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);

    const request = (config) => {
        if (token) {
            const headers = { 'x-auth-token': token };
            config.headers = { ...config.headers, ...headers };
        }

        console.log(config);

        return api(config)
            .catch((error) => {
                switch (error.response?.status) {
                    case 404:
                        navigate('/not-found');
                        break;
                    case 500:
                        navigate('/server-error');
                        break;
                    default:
                        break;
                }
                return error.response; 
            });
    };

    return { request };
};
