import axios from '../../http/axios';
import { GetDayListResponse } from '../../models/response/GetDayListResponse';
import { GetSlotListResponse } from '../../models/response/GetSlotListResponse';

class dayService {
    async getValidDays(id: string) {
        return axios.get<GetDayListResponse>(`/week/getDays/${id}`);
    }
    async getValidSlots(barberId: string, dayId: string) {
        return axios.get<GetSlotListResponse>(`/week/getSlots/${barberId}/${dayId}`)
    }
}

export default new dayService();