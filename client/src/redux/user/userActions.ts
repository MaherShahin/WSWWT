import { IUser } from '../../interfaces/user/IUser.interface';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from './actionTypes';
import { UserActionTypes } from '../../interfaces/redux/UserActions.interface';

export const loginUser = (user: IUser): UserActionTypes => ({
  type: LOGIN_USER,
  payload: user
});

export const logoutUser = (): UserActionTypes => ({
  type: LOGOUT_USER,
});

export const registerUser = (): UserActionTypes => ({
  type: REGISTER_USER,
});

export const updateUser = (user: IUser): UserActionTypes => ({
  type: UPDATE_USER,
  payload: user
});
