import { IBarber } from "../IBarber";
import {IUser} from "../IUser";

export interface AuthResponse {
    user: IUser | IBarber;
    token: string;
    message: string;
}