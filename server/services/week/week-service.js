import ApiError from '../../exceptions/api-error.js'
import Week from '../../models/week-model.js'
import Day from '../../models/day-model.js'
import Slot from '../../models/slot-model.js'
import WeekDto from '../../dtos/week-dto.js';

class WeekService {
    async createWeek(barberId, selectedDays, selectedHours) {
        const today = new Date();
        const lastWeek = await Week.findOne({ barberId: barberId }).sort({ number: -1 });

        let startDate = new Date();
        if (lastWeek && today >= lastWeek.startDate && today <= lastWeek.endDate) {
            // Якщо сьогоднішня дата знаходиться в межах останнього тижня, обчислюємо наступний понеділок після lastWeek.endDate
            startDate = await this.getNextMonday(lastWeek.endDate);
        } else {
            // Якщо немає останнього тижня або сьогоднішня дата не знаходиться в межах останнього тижня, використовуємо поточний понеділок
            startDate = await this.getMonday(today);
        }

        const endDate = new Date(startDate.getTime());
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 58, 0, 0)

        const number = lastWeek ? lastWeek.number + 1 : 1;

        const week = await Week.create({
            startDate,
            endDate,
            number,
            barberId,
            status: 'active',
        });

        await this.createDays(week._id, startDate, endDate, barberId, selectedDays, selectedHours);
        return week;
    }

    async getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = day === 0 ? -6 : 1 - day; // виправлено: перенесення на понеділок
        d.setDate(d.getDate() + diff);
        d.setHours(0, 0, 0, 0); // Обнулення часу до першої хвилини понеділка
        return d;
    }
    
    async getNextMonday(date) {
        const resultDate = new Date(date.getTime());
        resultDate.setDate(resultDate.getDate() + ((1 + 7 - resultDate.getDay()) % 7 || 7));
        resultDate.setHours(0, 0, -2, 0); // Налаштування часу на 2 хвилини до наступного понеділка
        return resultDate;
    }

    async createDays(weekId, startDate, endDate, barberId, selectedDays, selectedHours) {
        const days = [];
        let d = new Date(startDate.getTime());
        while (d <= endDate) {
            const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
            console.log(dayName)
            console.log('dayName')
            console.log(selectedDays)
            console.log('selectedDays')
            const isDayOff = selectedDays.includes(dayName);
            console.log(isDayOff)
            const day = {
                date: new Date(d),
                dayName: dayName,
                weekId,
                isDayOff: isDayOff,
            };
            days.push(day);
            d.setDate(d.getDate() + 1);
        }
    
        const createdDays = await Day.insertMany(days);
        for (const day of createdDays) {
            if (!day.isDayOff) { // Створюємо слоти лише для робочих днів
                await this.createSlots(day._id, day.date, barberId, selectedHours);
            }
        }
    
        await Week.findByIdAndUpdate(weekId, { $set: { days: createdDays.map(day => day._id) } });
    }
    
    async createSlots(dayId, date, barberId, selectedHours) {
        const slots = [];
        for (let hour = 8; hour <= 19; hour++) {
            const isHourOff = selectedHours.includes(hour); // Перевірка, чи година є вихідною
            const slotDate = new Date(date);
            slotDate.setHours(hour, 0, 0, 0);
            slots.push({
                date: slotDate,
                dayId,
                barberId,
                service: 'None',
                slotStatus: isHourOff ? 'Unavailable' : 'Available', // Встановлення статусу слота
            });
        }
    
        const createdSlots = await Slot.insertMany(slots);
        await Day.findByIdAndUpdate(dayId, { $set: { slots: createdSlots.map(slot => slot._id) } });
    }

    async getWeeks(barberId) {
        const today = new Date();
        // Оновлюємо статус тижнів на "archived", де endDate < today
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        await Week.updateMany(
            { barberId: barberId, endDate: { $lte: endOfDay }, status: 'active' },
            { $set: { status: 'archived' } }
        );
        // Знаходимо всі активні тижні
        const activeWeeks = await Week.find({ barberId: barberId, status: 'active' });
        if (!activeWeeks.length) {
            return {message: 'No weeks'};
        }
        // Підготовка DTO для кожного тижня
        const weeks = await Promise.all(activeWeeks.map(async week => {
            // Знаходимо всі дні цього тижня
            const days = await Day.find({ weekId: week._id }).sort({ date: 1 });

            // Знаходимо всі слоти для днів цього тижня
            const dayIds = days.map(day => day._id);
            const slots = await Slot.find({ dayId: { $in: dayIds } }).sort({ date: 1 });

            // Створення WeekDto з урахуванням днів і слотів
            return new WeekDto(week, days, slots);
        }));

        return { weeks, message: 'Тиждні знайдені.' };
    }
}

export default new WeekService();