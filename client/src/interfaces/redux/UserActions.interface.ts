import { IUser } from "../user/IUser.interface";
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from "../../redux/user/actionTypes";
import { type } from "@testing-library/user-event/dist/type";


type LoginAction = {
    type: typeof LOGIN_USER;
    payload: IUser;
};

type LogoutAction = {
    type: typeof LOGOUT_USER;
};

type RegisterAction = {
    type: typeof REGISTER_USER;
};

type updateAction = {
    type: typeof UPDATE_USER;
    payload: IUser;
};

export type UserActionTypes = LoginAction | LogoutAction | RegisterAction | updateAction ;
