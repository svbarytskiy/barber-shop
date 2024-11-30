import mongoose from 'mongoose'

const BarberSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        services: {
            type: {
                haircut: { type: Boolean, required: true, default: false },
                hairDyeing: { type: Boolean, required: true, default: false },
                pedicure: { type: Boolean, required: true, default: false },
                manicure: { type: Boolean, required: true, default: false },
                hairExtension: { type: Boolean, required: true, default: false },
                hairStyling: { type: Boolean, required: true, default: false },
            },
            required: true,
        },
        weeks: [{ type: mongoose.Types.ObjectId, ref: 'Week' }],
        status: { type: String, required: true, default: 'Barber' },
        sendedMsg: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
        receivedMsg: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true },
)

export default mongoose.model('Barber', BarberSchema)