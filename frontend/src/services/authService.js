import ApiResponse from "../api/ApiResponse";

const LOGIN_ENDPOINT = '/auth/login';
const REGISTER_ENDPOINT = '/auth/register';

export const loginUser = async (request, userInfo) => {
    const res = await request({
        method: 'POST',
        url: LOGIN_ENDPOINT,
        data: userInfo
    });
    return res;
}



export const registerUser = async (request, userInfo) => {
    try {
        const res = await request({
            method: 'post',
            url: REGISTER_ENDPOINT,
            data: userInfo
        });
    
        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not register user');
            return;
        }
    
        return res;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}