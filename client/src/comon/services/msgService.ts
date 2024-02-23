import axios from '../../http/axios';
import { AcceptRequestResponse } from '../../models/response/AcceptRequestResponse';
import { CreateRequestResponse } from '../../models/response/CreateRequestResponse';
import { DeclineRequestResponse } from '../../models/response/DeclineRequestResponse';
import { GetRequestListResponse } from '../../models/response/GetRequestListResponse';

class msgService {
    async getMsgList(id: string) {
        return axios.get<GetRequestListResponse>(`/msg/getMsgs/${id}`,);
    }
    async createRequest(sender: string, service: string, time: Date, text: string, receiver: string) {
        return axios.post<CreateRequestResponse>(`/msg/createRequest/${sender}`, { service, time, text, receiver });
    }
    async declineRequest(msgId: string, sender: string, text: string, receiver: string) {
        return axios.post<DeclineRequestResponse>(`/msg/declineRequest/${msgId}`, { sender, text, receiver });
    }
    async acceptRequest(msgId: string, sender: string, text: string, receiver: string) {
        return axios.post<AcceptRequestResponse>(`/msg/acceptRequest/${msgId}`, { sender, text, receiver });
    }
}

export default new msgService();