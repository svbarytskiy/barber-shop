import axios from '../../http/axios';
import { AuthResponse } from '../../models/response/AuthResponse';

class AuthService {
    async login(phoneNumber: string, password: string) {
        return axios.post<AuthResponse>(`/auth/login`, { phoneNumber, password });
    }

    async registration(username: string, password: string, phoneNumber: string) {
        return axios.post<AuthResponse>(`/auth/register`, { username, password, phoneNumber });
    }

    async logout() {
        return axios.post(`/logout`);
    }

    async checkAuth() {
        return axios.get<AuthResponse>(`/auth/me`, { withCredentials: true })
    }
    async updateUser(username: string, phoneNumber: string) {
        return axios.put<AuthResponse>(`/update/me`, { username, phoneNumber})
    }
}

export default new AuthService();
