import { makeAutoObservable } from 'mobx';
import { IWeek } from '../../../models/IWeek';
import weekService from '../../services/weekService';
import { IDay } from '../../../models/IDay';
import { ISlot } from '../../../models/ISlot';
import dayService from '../../services/dayService';

export default class ScheduleStore {
    weeks: IWeek[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setWeeks(weeks: IWeek[]) {
        this.weeks = weeks;
    }

    async createWeek(selectedDays: string[], selectedHours: number[], id: string) {
        this.setLoading(true);
        try {
            console.log('chipichipi')
            const response = await weekService.createWeek(selectedDays, selectedHours, id);
            console.log(response.data)
            if (response.data) {
                console.log(response.data.message)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async getWeekList(id: string) {
        this.setLoading(true);
        try {
            const response = await weekService.getWeekList(id)
            if (response.data) {
                console.log(response.data.weeks)
                this.setWeeks(response.data.weeks)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async updateDay(updates: Array<Partial<ISlot>>) {
        this.setLoading(true);
        try {
            const response = await dayService.updateDay(updates)
            if (response.data) {
                return (response.data.message)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}