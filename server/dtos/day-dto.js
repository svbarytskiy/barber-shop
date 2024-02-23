export default class DayDto {
    id;
    dayName;
    date;
    weekId;
    isDayOff;
    constructor(model) {
        this.id = model._id;
        this.weekId = model.weekId;
        this.date = model.date;
        this.dayName = model.dayName;
        this.isDayOff = model.isDayOff;
    }
}
