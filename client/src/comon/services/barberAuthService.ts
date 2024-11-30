import axios from '../../http/axios';
import { BarberAuthResponse } from '../../models/response/BarberAuthResponse';


class BarberAuthService {
    async login(phoneNumber: string, password: string) {
        return axios.post<BarberAuthResponse>(`/barber/login`, { phoneNumber, password });
    }
    async registration(data: FormData) {
        return axios.post<BarberAuthResponse>(`/barber/register`, data, { withCredentials: true });
    }

    async logout() {
        return axios.post(`/logout`);
    }

    async checkAuth() {
        return axios.get<BarberAuthResponse>(`/barber/me`, { withCredentials: true })
    }
}

export default new BarberAuthService();