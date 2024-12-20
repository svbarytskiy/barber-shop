export default class WeekDto {
    constructor(week, days, slots) {
        this.id = week._id;
        this.startDate = week.startDate;
        this.endDate = week.endDate;
        this.number = week.number;
        this.barberId = week.barberId;
        this.status = week.status;
        this.days = days.map(day => ({
            id: day._id,
            date: day.date,
            dayName: day.dayName,
            isDayOff: day.isDayOff,
            slots: slots.filter(slot => slot.dayId.toString() === day._id.toString()).map(slot => ({
                id: slot._id,
                date: slot.date,
                clientNum: slot.clientNum,
                barberId: slot.barberId,
                service: slot.service,
                slotStatus: slot.slotStatus
            })) || []
        }));
    }
}
