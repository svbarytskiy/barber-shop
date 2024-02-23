import Day from '../../models/day-model.js';
import Week from '../../models/week-model.js';
import Slot from '../../models/slot-model.js';
import DayDto from '../../dtos/day-dto.js';

class DayService {
    async getValidDays(barberId) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const currentTime = new Date(); // Зберігаємо поточний час для порівняння з часом слотів

        // Перевірка і видалення двокрапки з barberId, якщо вона є
        const formattedBarberId = barberId.replace(":", "");

        // Пошук всіх тижнів для даного барбера
        const weeks = await Week.find({ barberId: formattedBarberId });

        if (!weeks.length) {
            console.log("Тижні для даного барбера не знайдені");
            return { days: [], message: "Тижні для даного барбера не знайдені" };
        }

        // Пошук всіх днів для знайдених тижнів, які ще не пройшли, і сортування їх за датою
        const weekIds = weeks.map(week => week._id);
        const validDays = await Day.find({
            weekId: { $in: weekIds },
            date: { $gte: now }
        }).sort({ date: 1 }).lean();

        // Фільтрація днів з наявністю вільних слотів, враховуючи поточний час
        const daysWithValidSlots = await Promise.all(validDays.map(async (day) => {
            const slotsForDay = await Slot.find({
                dayId: day._id,
                date: { $gte: currentTime }, // Тут ми використовуємо currentTime для фільтрації слотів, які ще не пройшли
                slotStatus: 'Available'
            });

            if (slotsForDay.length > 0) {
                return new DayDto(day);
            }
        }));

        // Видалення неопрацьованих днів (undefined)
        const filteredDays = daysWithValidSlots.filter(day => day !== undefined);

        return { days: filteredDays, message: "Знайдені валідні дні" };
    }
}

export default new DayService();
