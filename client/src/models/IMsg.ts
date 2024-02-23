export interface IMsg {
    id: string
    text: string
    time: Date
    sender: { id: string },
    receiver: { id: string },
    isViewed: boolean
    msgStatus: string
    reply: string
    service: string
}