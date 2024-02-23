import mongoose from 'mongoose'

const DaySchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        dayName: { type: String, required: true },
        // slots: [{ type: mongoose.Types.ObjectId, ref: 'Slot' }],
        weekId: { type: mongoose.Types.ObjectId, ref: 'Week' },
        isDayOff: { type: Boolean, required: true, default: false }
    },
    { timestamps: true },
)

export default mongoose.model('Day', DaySchema)