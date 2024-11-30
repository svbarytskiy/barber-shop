import { makeAutoObservable } from 'mobx';
import { IBarber } from '../../../models/IBarber';
import barberInteractionService from '../../services/barberInteractionService';

export default class BarberStore {
    barber = {} as IBarber;
    isLoading = false;
    barbers: IBarber[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setBarber(barber: IBarber) {
        this.barber = barber;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setAllBarbers(barbers: IBarber[]) {
        this.barbers = barbers;
    }

    async getAllBarbers() {
        this.setLoading(true);
        try {
            const response = await barberInteractionService.getAllBarbers();
            console.log(response.data)
            if (response.data) {
                this.setAllBarbers(response.data.barbers);
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteBarber(id: string) {
        this.setLoading(true);
        try {
            const response = await barberInteractionService.deleteBarber(id);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async updateBarber(data: FormData, id: string) {
        this.setLoading(true);
        try {
            const response = await barberInteractionService.updateBarber(data, id);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}