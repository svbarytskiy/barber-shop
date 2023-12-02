export interface IBarber {
    image: File ;
    id: string,
    username: string,
    password: string,
    photo: File,
    weeks: IWeek[];
    services: IService;
    phoneNumber: string,
    status: string,
    sendedMsg: IMessage[],
    receivedMsg: IMessage[]
}
interface IMessage {

}
interface IWeek {

}
interface IService {
    haircut: boolean;
    hairDyeing: boolean;
    pedicure: boolean;
    manicure: boolean;
    hairExtension: boolean;
    hairStyling: boolean;
}