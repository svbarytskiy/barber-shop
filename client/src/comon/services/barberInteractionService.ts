import axios from '../../http/axios';
import { GetBarberResponse } from '../../models/response/GetBarberResponse';
import { GetAllBarbersResponse } from '../../models/response/GetAllBarbersResponse';


class barberInteractionService {
    async getAllBarbers() {
        return axios.get<GetAllBarbersResponse>(`/barber/getAllBarbers`,);
    }
    async getBarber() {
        return axios.get<GetBarberResponse>(`/barber/getBarber:id`,);
    }
    async deleteBarber(id: string) {
        return axios.delete(`/barber/delete/${id}`,);
    }
    async updateBarber(data: FormData, id: string) {
        return axios.put(`/barber/update/${id}`, data, { withCredentials: true })
    }
}

export default new barberInteractionService();