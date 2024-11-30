import axios from '../../http/axios';
import { CreateWeekResponse } from '../../models/response/CreateWeekResponse';
import { GetWeekListResponse } from '../../models/response/getWeekListResponse';

class weekService {
    async getWeekList(id: string) {
        return axios.get<GetWeekListResponse>(`/week/getWeeks/${id}`,);
    }
    async createWeek(selectedDays: string[], selectedHours: number[], id: string) {
        console.log('chipichipi')
        return axios.post<CreateWeekResponse>(`/week/createWeek/${id}`, {selectedDays, selectedHours});
    }
}

export default new weekService();