import { makeAutoObservable } from 'mobx';
import AuthStore from './auth/auth'
import BarberAuthStore from './barber/barberAuth';
import BarberStore from './barber/barber'
import ScheduleStore from './schedule/schedule';
import SessionStore from './session/session';
import MessageStore from './message/message';

export default class RootStore {
    auth: AuthStore;
    // barberAuth: BarberAuthStore;
    barber: BarberStore;
    schedule: ScheduleStore;
    session: SessionStore;
    message: MessageStore;
    constructor() {
        makeAutoObservable(this);
        this.auth = new AuthStore();
        //   this.barberAuth = new BarberAuthStore();
        this.barber = new BarberStore();
        this.schedule = new ScheduleStore();
        this.session = new SessionStore();
        this.message = new MessageStore();
    }
}