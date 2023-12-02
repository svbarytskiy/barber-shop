import { IBarber } from '../IBarber'

export interface BarberAuthResponse {
    token: string;
    barber: IBarber;
    message: string;
}