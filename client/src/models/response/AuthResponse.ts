import {IUser} from "../IUser";

export interface AuthResponse {
    user: IUser;
    token: string;
    message: string;
}