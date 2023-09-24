import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.response.use(response => {
  return response;
}, (error) => {
  if (error.response) {
    const errorData = error.response.data;

    switch (error.response.status) {
      case 400:
        if (Array.isArray(errorData) && errorData[0] && errorData[0].field && errorData[0].message) {
          toast.error(`Validation Error: ${errorData[0].message}`);
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
        break;

      case 500:
        break;

      default:
        toast.error('An unexpected error occurred.');
        break;
    }

  } else {
    toast.error('An error occurred. Please check your connection.');
  }
});

export const authenticatedRequest = (method, url, data) => {
  const token = localStorage.getItem('token');
  const headers = token ? { 'x-auth-token': token } : {};

  return api({
    method,
    url,
    headers,
    data,
  });
};


export default api;

