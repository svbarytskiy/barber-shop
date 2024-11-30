import { ISlot } from "../ISlot";

export interface GetSlotListResponse{
    slots: ISlot[];
    message?: string;
}