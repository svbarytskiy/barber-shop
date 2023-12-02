export default class UserDto {
    username;
    id;
    image;
    phoneNumber;
    status;
    services;
    weeks;
    constructor(model) {
        this.username = model.username;
        this.phoneNumber = model.phoneNumber;
        this.id = model._id;
        this.status = model.status;
        this.sendedMsg = model.sendedMsg;
        this.receivedMsg = model.receivedMsg;
        this.weeks = model.weeks;
        this.services = model.services;
        this.image = model.image;
    }
}