import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: { type: String, required: true, unique: true },
        status: { type: String, required: true },
        sendedMsg: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
        receivedMsg: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)