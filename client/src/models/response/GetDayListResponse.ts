import { IDay } from "../IDay";

export interface GetDayListResponse{
    days: IDay[];
    message?: string;
}