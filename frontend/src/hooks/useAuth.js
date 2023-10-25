import { useApi } from '../api/useApi';
import {
    loginUser, registerUser
} from '../services/authService';

export const useLogin = () => {
    const { request } = useApi();
    const handleLogin = async (userInfo) => {
        try {
            const res = await loginUser(request, userInfo);
            console.log(res);
            const user = res.getData();
            
            if (!user) {
                console.log('Error logging in user');
                return [];
            }

            return user;
        } catch (e) {
            throw e;
        }
    }

    return { handleLogin };
}

export const useRegister = () => {
    const { request } = useApi();

    const handleRegister = async (userInfo) => {
        try {
            const res = await registerUser(request, userInfo);

            const user = res.getData();

            if (!user) {
                console.log('Error registering user');
                return [];
            }

            return user;
        } catch (e) {
            throw e;
        }
    }

    return { handleRegister };
}