import { useApi } from '../api/useApi';
import {
    loginUser, registerUser
} from '../services/authService';

import { useMutation } from 'react-query';

export const useLogin = () => {
    const { request } = useApi();
    const loginMutation = useMutation((userInfo) => loginUser(request, userInfo));

    return {
        ...loginMutation,
        handleLogin: loginMutation.mutate,
    };
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