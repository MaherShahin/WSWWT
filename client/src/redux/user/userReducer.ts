import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from './actionTypes';
import { IUser } from '../../interfaces/user/IUser.interface';
import { UserActionTypes } from '../../interfaces/redux/UserActions.interface';

export interface UserState {
    user: IUser | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, user: action.payload, isLoggedIn: true };
        case LOGOUT_USER:
            return { ...state, user: null, isLoggedIn: false };
        case REGISTER_USER:
            return state;
        case UPDATE_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default userReducer;
