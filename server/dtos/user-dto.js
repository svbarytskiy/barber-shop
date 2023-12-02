export default class UserDto {
    username;
    id;
    phoneNumber;
    status;
    image;
    constructor(model) {
        this.username = model.username;
        this.phoneNumber = model.phoneNumber;
        this.id = model._id;
        this.status = model.status;
        this.image = model.image;
        this.sendedMsg = model.sendedMsg;
        this.receivedMsg = model.receivedMsg;
    }
}