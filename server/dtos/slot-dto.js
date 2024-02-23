export default class SlotDto {
    barberId;
    id;
    dayId;
    slotStatus;
    date
    constructor(model) {
        this.barberId = model.barberId;
        this.dayId = model.dayId;
        this.id = model._id;
        this.slotStatus = model.slotStatus;
        this.date = model.date;
    }
}