import { IDay } from "./IDay";

export interface IWeek {
    id: string,
    startDate: Date,
    endDate: Date,
    days: IDay[],
    number: number,
    barberId: string,
    status: string
}
