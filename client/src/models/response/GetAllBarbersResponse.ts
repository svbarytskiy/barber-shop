import { IBarber } from '../IBarber'

export interface GetAllBarbersResponse {
    barbers: IBarber[];
    message: string;
}