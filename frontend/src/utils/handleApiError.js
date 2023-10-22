import { toast } from 'react-toastify';

export const handleApiError = (error) => {
    const errors = error?.response?.data?.errors;
    if (errors && errors.length > 0) {
        errors.forEach((err) => {
            toast.error(err.message)
        });
    } else {
        toast.error('An error occurred. The system has not provided an error message, please check your console.');
    }
return Promise.reject(error);
};