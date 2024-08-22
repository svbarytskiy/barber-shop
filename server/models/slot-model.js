import mongoose from 'mongoose'

const SlotSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        dayId: { type: mongoose.Types.ObjectId, ref: 'Day' },
        clientNum: { type: String, default: '' },
        barberId: { type: mongoose.Types.ObjectId, ref: 'Barber' },
        service: {
            type: String,
            required: true, default: 'None'
        },
        slotStatus: {
            type: String,
            required: true, default: 'Availible'
        }
    },
    { timestamps: true },
)

export default mongoose.model('Slot', SlotSchema)