export default class MsgDto {
    id;
    sender;
    receiver;
    text;
    service;
    time;
    isViewed;
    msgStatus;
    reply;

    constructor(model) {
        this.id = model._id;
        this.sender = model.sender;
        this.receiver = model.receiver;
        this.text = model.text;
        this.service = model.service;
        this.time = model.time;
        this.isViewed = model.isViewed;
        this.msgStatus = model.msgStatus;
        this.reply = model.reply ? model.reply.toString() : null; // Якщо reply є ObjectId, перетворюємо його в строку
    }
}
