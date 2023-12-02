import { makeAutoObservable } from 'mobx';
import AuthStore from './auth/auth'
import BarberAuthStore from './barber/barberAuth';
import BarberStore from './barber/barber'

export default class RootStore {
    auth: AuthStore;
    barberAuth: BarberAuthStore;
    barber: BarberStore;
    constructor() {
        makeAutoObservable(this);
        this.auth = new AuthStore();
        this.barberAuth = new BarberAuthStore();
        this.barber = new BarberStore();
    }
}