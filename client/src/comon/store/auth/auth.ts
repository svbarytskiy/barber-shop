import { makeAutoObservable } from 'mobx';
import { IUser } from "../../../models/IUser";
import AuthService from '../../services/authService';
import { IBarber } from '../../../models/IBarber';
import BarberAuthService from '../../services/barberAuthService';


export default class AuthStore {
    user = {} as IUser | IBarber;
    isAuth = false;
    isLoading = false;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser | IBarber) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setToken(token: string | null) {
        this.token = token;
    }

    async loginUser(phoneNumber: string, password: string) {
        try {
            const response = await AuthService.login(phoneNumber, password);
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
            }
            if (response.data.token) {
                window.localStorage.setItem('userToken', response.data.token)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async registrationUser(username: string, password: string, phoneMumber: string) {
        try {
            const response = await AuthService.registration(username, password, phoneMumber);
            console.log(response)
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
                if (response.data.token) {
                    window.localStorage.setItem('userToken', response.data.token)
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async logout() {
        this.setLoading(true);
        try {
            localStorage.removeItem('userToken');
            localStorage.removeItem('barberToken');
            this.setAuth(false);
            this.setUser({} as IUser);
            this.setToken(null);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async checkAuthUser() {
        this.setLoading(true);
        try {
            const response = await AuthService.checkAuth();
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
                if (response.data.token) {
                    window.localStorage.setItem('userToken', response.data.token)
                }
            } else {
                localStorage.removeItem('userToken');
                this.setAuth(false);
                this.setUser({} as IUser);
                this.setToken(null);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async updateUser(username: string, phoneMumber: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.updateUser(username, phoneMumber);
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
                if (response.data.token) {
                    window.localStorage.setItem('userToken', response.data.token)
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async loginBarber(phoneNumber: string, password: string) {
        try {
            const response = await BarberAuthService.login(phoneNumber, password);
            if (response.data.barber) {
                this.setAuth(true);
                this.setUser(response.data.barber);
            }
            if (response.data.token) {
                window.localStorage.setItem('barberToken', response.data.token)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async registrationBarber(data: FormData) {
        try {
            const response = await BarberAuthService.registration(data);
            console.log(response)
            if (response.data.barber) {
                this.setAuth(true);
                this.setUser(response.data.barber);
                if (response.data.token) {
                    window.localStorage.setItem('barberToken', response.data.token)
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
   
    async checkAuthBarber() {
        this.setLoading(true);
        try {
            console.log('BABAbui')
            const response = await BarberAuthService.checkAuth();
            if (response.data.barber) {
                this.setAuth(true);
                this.setUser(response.data.barber);
                if (response.data.token) {
                    window.localStorage.setItem('barberToken', response.data.token)
                }
            } else {
                localStorage.removeItem('barberToken');
                this.setAuth(false);
                this.setUser({} as IBarber);
                this.setToken(null);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}