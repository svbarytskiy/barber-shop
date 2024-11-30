import SlotService from '../services/week/slot-service.js';
import WeekService from '../services/week/week-service.js';
import DayService from '../services/week/day-service.js';

class WeekController {
    async createWeek(req, res, next) {
        try {
            const barberId = req.params.id;
            const { selectedDays, selectedHours } = req.body
            const weekData = await WeekService.createWeek(barberId, selectedDays, selectedHours);
            return res.json(weekData)
        } catch (e) {
            next(e);
        }
    }
    async getWeeks(req, res, next) {
        try {
            const barberId = req.params.id;
            const weeks = await WeekService.getWeeks(barberId);
            return res.json(weeks);
        } catch (e) {
            next(e);
        }
    }

    async getValidDays(req, res, next) {
        try {
            const barberId = req.params.id;
            const days = await DayService.getValidDays(barberId);
            return res.json(days);
        } catch (e) {
            next(e);
        }
    }
    async getValidSlots(req, res, next) {
        try {
            const barberId = req.params.barberId;
            const dayId = req.params.dayId;
            const days = await SlotService.getValidSlots(barberId, dayId);
            return res.json(days);
        } catch (e) {
            next(e);
        }
    }

    async updateSlots(req, res, next) {
        try {
            const { updates } = req.body;
            const updatedSlots = await SlotService.updateSlots(updates);
            return res.json(updatedSlots);
        } catch (e) {
            next(e);
        }
    }
}
export default new WeekController();