import { makeAutoObservable } from 'mobx';
import { IBarber } from '../../../models/IBarber';
import BarberAuthService from '../../services/barberAuthService';

export default class BarberAuthStore {
    barber = {} as IBarber;
    isAuth = false;
    isLoading = false;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setBarber(barber: IBarber) {
        this.barber = barber;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setToken(token: string | null) {
        this.token = token;
    }
    async login(phoneNumber: string, password: string) {
        try {
            const response = await BarberAuthService.login(phoneNumber, password);
            if (response.data.barber) {
                this.setAuth(true);
                this.setBarber(response.data.barber);
            }
            if (response.data.token) {
                window.localStorage.setItem('token', response.data.token)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async registration(data: FormData) {
        try {
            const response = await BarberAuthService.registration(data);
            console.log(response)
            if (response.data.barber) {
                this.setAuth(true);
                this.setBarber(response.data.barber);
                if (response.data.token) {
                    window.localStorage.setItem('token', response.data.token)
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async logout() {
        this.setLoading(true);
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setBarber({} as IBarber);
            this.setToken(null);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await BarberAuthService.checkAuth();
            if (response.data.barber) {
                this.setAuth(true);
                this.setBarber(response.data.barber);
                if (response.data.token) {
                    window.localStorage.setItem('token', response.data.token)
                }
            } else {
                localStorage.removeItem('token');
                this.setAuth(false);
                this.setBarber({} as IBarber);
                this.setToken(null);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
 
}