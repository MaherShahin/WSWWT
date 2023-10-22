import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/apiUtil';
import { toast } from 'react-toastify';

export const useApi = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);

    const request = async (config) => {
        try {
            const response = await apiRequest(config, token);
            return response;
        } catch (error) {
            switch (error?.response?.status) {
                case 404:
                    navigate('/not-found');
                    break;
                case 500:
                    navigate('/server-error');
                    break;
                default: 
                    console.error("Api hook error : " + error);
                    navigate('/');
            }
            return error.response; 
        }
    };

    return { request };
};
