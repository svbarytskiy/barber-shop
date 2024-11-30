import { IWeek } from "../IWeek";

export interface GetWeekListResponse{
    weeks: IWeek[];
    message?: string;
}