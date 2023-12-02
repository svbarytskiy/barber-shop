export interface IUser {
    id: string,
    username: string,
    password: string,
    phoneNumber: string,
    status: string,
    sendedMsg: IMessage[],
    receivedMsg: IMessage[]
}
interface IMessage {

}