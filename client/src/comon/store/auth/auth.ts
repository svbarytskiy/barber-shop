import { makeAutoObservable } from 'mobx';
import { IUser } from "../../../models/IUser";
import AuthService from '../../services/authService';

export default class AuthStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setToken(token: string | null) {
        this.token = token;
    }

    async login(phoneNumber: string, password: string) {
        try {
            const response = await AuthService.login(phoneNumber, password);
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
            }
            if (response.data.token) {
                window.localStorage.setItem('token', response.data.token)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async registration(username: string, password: string, phoneMumber: string) {
        try {
            const response = await AuthService.registration(username, password, phoneMumber);
            console.log(response)
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
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
            this.setUser({} as IUser);
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
            const response = await AuthService.checkAuth();
            if (response.data.user) {
                this.setAuth(true);
                this.setUser(response.data.user);
                if (response.data.token) {
                    window.localStorage.setItem('token', response.data.token)
                }
            } else {
                localStorage.removeItem('token');
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
                    window.localStorage.setItem('token', response.data.token)
                }
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}