import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from './apiUtil';

export const useApi = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);

    const request = async (config) => {
        try {
            const request = await apiRequest(config, token);
            console.log(request);
            return request;
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
            }
            return error.response; 
        }
    };

    return { request };
};
