import { makeAutoObservable } from 'mobx';


import { IMsg } from '../../../models/IMsg';
import msgService from '../../services/msgService';

export default class MessageStore {
    msgs: IMsg[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setWeeks(msgs: IMsg[]) {
        this.msgs = msgs;
    }

    async createRequest(sender: string, service: string, time: Date, text: string, receiver: string) {
        this.setLoading(true);
        try {
            const response = await msgService.createRequest(sender, service, time, text, receiver);
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
    async getAllMsgs(id: string) {
        this.setLoading(true);
        try {
            console.log('туп')
            console.log(id)
            console.log('туп')

            const response = await msgService.getMsgList(id)
            if (response.data) {
                console.log(response.data.msgs)
                console.log(response.data)
                this.setWeeks(response.data.msgs)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async declineRequest(msgId: string, sender: string,  text: string, receiver: string) {
        this.setLoading(true);
        try {
            const response = await msgService.declineRequest(msgId, sender,  text, receiver)
            if (response.data) {
                console.log(response.data.msg)
                console.log(response.data)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
    async acceptRequest(msgId: string, sender: string,  text: string, receiver: string) {
        this.setLoading(true);
        try {
            const response = await msgService.acceptRequest(msgId, sender,  text, receiver)
            if (response.data) {
                console.log(response.data.msg)
                console.log(response.data)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

}