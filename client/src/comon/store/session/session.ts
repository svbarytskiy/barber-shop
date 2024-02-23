import { makeAutoObservable } from 'mobx';
import { IWeek } from '../../../models/IWeek';
import weekService from '../../services/weekService';
import { IDay } from '../../../models/IDay';
import dayService from '../../services/dayService';
import { ISlot } from '../../../models/ISlot';

export default class SessionStore {
    weeks: IWeek[] = [];
    isLoading = false;
    days: IDay[] = [];
    slots: ISlot[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setWeeks(weeks: IWeek[]) {
        this.weeks = weeks;
    }
    setDays(days: IDay[]) {
        this.days = days;
    }
    setSlots(slots: ISlot[]) {
        this.slots = slots;
    }

    async getWeekList(id: string) {
        this.setLoading(true);
        try {
            const response = await weekService.getWeekList(id)
            if (response.data) {
                this.setWeeks(response.data.weeks)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async getValidDays(id: string) {
        this.setLoading(true);
        try {
            const response = await dayService.getValidDays(id)
            if (response.data) {
                console.log(response.data)
                console.log(response.data.days)
                this.setDays(response.data.days)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async getValidSlots(barberId: string, dayId: string) {
        this.setLoading(true);
        try {
            const response = await dayService.getValidSlots(barberId, dayId)
            if (response.data) {
                this.setSlots(response.data.slots)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}