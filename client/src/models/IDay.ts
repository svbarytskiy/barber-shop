import { ISlot } from "./ISlot";

export interface IDay {
    id: string,
    date: Date,
    dayName: string,
    slots: ISlot[],
    weekId: string
    isDayOff: boolean
}