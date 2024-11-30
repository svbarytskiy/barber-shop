import Week from '../../models/week-model.js'
import Day from '../../models/day-model.js'
import Slot from '../../models/slot-model.js'
import SlotDto from '../../dtos/slot-dto.js'
import mongoose from 'mongoose'

class SlotService {
    async updateSlots(slots) {
        try {
            const updates = slots.map(slot => ({
                updateOne: {
                    filter: { _id: slot.id },
                    update: { $set: { slotStatus: slot.slotStatus, service: slot.service, clientNum: slot.clientNum } }
                }
            }));

            await Slot.bulkWrite(updates);
            return ({ message: 'Slots updated successfully.' })
        } catch (error) {
            console.error('Failed to update slots:', error);
            return ({ message: 'Failed to update' })
        }
    }
    async getValidSlots(barberId, dayId) {
        const now = new Date(); 
        const formattedBarberId = barberId.replace(":", "");
        const formattedDayId = dayId.replace(":", "");
        try {
            const validSlots = await Slot.find({
                barberId: new mongoose.Types.ObjectId(formattedBarberId), 
                dayId: new mongoose.Types.ObjectId(formattedDayId), 
                date: { $gte: now },
                slotStatus: 'Available'
            }).sort({ date: 1 });

            const slotsDto = validSlots.map(slot => new SlotDto(slot));

            return {
                slots: slotsDto,
                message: "Слоти знайдені успішно"
            };
        } catch (error) {
            console.error("Error fetching valid slots:", error);
            throw error;
        }
    }
}

export default new SlotService();