import axios from '../../http/axios';
import { ISlot } from '../../models/ISlot';
import { GetDayListResponse } from '../../models/response/GetDayListResponse';
import { GetSlotListResponse } from '../../models/response/GetSlotListResponse';
import { UpdateDayResponse } from '../../models/response/UpdateDayResponse';

class dayService {
    async getValidDays(id: string) {
        return axios.get<GetDayListResponse>(`/week/getDays/${id}`);
    }
    async getValidSlots(barberId: string, dayId: string) {
        return axios.get<GetSlotListResponse>(`/week/getSlots/${barberId}/${dayId}`)
    }
    async updateDay(updates: Array<Partial<ISlot>>) {
        return axios.put<UpdateDayResponse>(`/week/updateSlots`, { updates })
    }
}

export default new dayService();