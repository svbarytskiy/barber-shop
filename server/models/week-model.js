import mongoose from 'mongoose'

const WeekSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        // days: [{ type: mongoose.Types.ObjectId, ref: 'Day' }],
        number: {
            type: Number,
            required: true,
            default: 0,
        },
        barberId: { type: mongoose.Types.ObjectId, ref: 'Barber' },
        status: { type: String, required: true },
    },
    { timestamps: true },
)

export default mongoose.model('Week', WeekSchema)