import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'sender.model'
            },
            model: {
                type: String,
                required: true,
                enum: ['User', 'Barber']
            }
        },
        receiver: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'receiver.model'
            },
            model: {
                type: String,
                required: true,
                enum: ['User', 'Barber']
            }
        },
        text: { type: String, required: true },
        time: { type: Date },
        isViewed: { type: Boolean, required: true, default: false },
        msgStatus: {
            type: String,
            required: true,
            enum: ['sent', 'viewed', 'replied', 'accepted', 'declined'],
            default: 'sent'
        },
        reply: { type: mongoose.Types.ObjectId, ref: 'Message' },
        service: { type: String, required: true }
    },
    { timestamps: true },
)

export default mongoose.model('Message', MessageSchema)