import mongoose from 'mongoose';
import Slot from '../../models/slot-model.js';
import ApiError from '../../exceptions/api-error.js';
import MsgDto from '../../dtos/message-dto.js';
import Message from '../../models/message-model.js';
import User from '../../models/user-model.js'
import Barber from '../../models/barber-model.js'

class MessageService {
    async createMessage(senderId, service, time, text, receiverId) {

        const slot = await Slot.findOne({ date: time });
        if (!slot) {
            throw ApiError.BadRequest('На цю дату неможливо зареєструватись.');
        } else if (slot.slotStatus === 'unAvailable') {
            throw ApiError.BadRequest('На цей час уже заброньовано. Виберіть іншу дату.');
        }
        const sender = await User.findById(senderId) ? { model: 'User', id: senderId } : await Barber.findById(senderId) ? { model: 'Barber', id: senderId } : null;
        const receiver = await User.findById(receiverId) ? { model: 'User', id: receiverId } : await Barber.findById(receiverId) ? { model: 'Barber', id: receiverId } : null;

        if (!sender || !receiver) {
            throw ApiError.BadRequest('Некоректний ID відправника або отримувача.');
        }

        const message = await Message.create({
            sender: { id: senderId, model: sender.model },
            receiver: { id: receiverId, model: receiver.model },
            text,
            time,
            service
        });

        return { message: new MsgDto(message), message: 'Повідомлення успішно створено.' };
    }

    async getAllMessages(id) {
        try {
            const msgs = await Message.find({
                $or: [
                    { 'sender.id': new mongoose.Types.ObjectId(id) },
                    { 'receiver.id': new mongoose.Types.ObjectId(id) }
                ]
            });

            if (!msgs.length) {
                return { msgs: [], message: 'Повідомлення не знайдені.' };
            }

            const messagesDto = msgs.map(message => new MsgDto(message));
            return { msgs: messagesDto, message: 'Повідомлення успішно знайдені.' };
        } catch (error) {
            console.error('Помилка при отриманні повідомлень:', error);
            throw error;
        }
    }

    async declineRequest(msgId, senderId, text, receiverId) {
        try {
            const msg = await Message.findByIdAndUpdate(msgId, { msgStatus: 'declined' }, { new: true });
            if (!msg) {
                throw new Error('Повідомлення не знайдено');
            }

            const declineMessage = await Message.create({
                sender: { id: receiverId, model: 'Barber' },
                receiver: { id: senderId, model: 'User' },
                text: text,
                service: msg.service,
                msgStatus: 'sent',
            });

            await Message.findByIdAndUpdate(msgId, { reply: declineMessage._id }, { new: true });

            return { message: 'Запит успішно відхилено', declinedMessage: declineMessage };
        } catch (error) {
            console.error('Помилка при відмові запиту:', error);
            throw error;
        }
    }

    async acceptRequest(msgId, senderId, text, receiverId) {
        try {
            console.log(msgId)
            const msg = await Message.findByIdAndUpdate(msgId, { msgStatus: 'accepted' }, { new: true });
            if (!msg) {
                throw new Error('Повідомлення не знайдено');
            }
            //ПОФІКСЬ ЦЮ ПАРАШУ МАЙБУТНІЙ Я, БО МЕНІ ЛІНЬ, БІГОМ!!!!
            console.log(receiverId)
            let client = await User.findById(receiverId)
            if (!client) {
                client = await Barber.findById(receiverId)
            }
            console.log(client)
            const setSlot = await Slot.findOneAndUpdate(
                { date: msg.time },
                { clientNum: client.phoneNumber, service: msg.service, slotStatus: 'Unavailable' },
                { new: true }
            );
            if (!setSlot) {
                throw new Error('Слот не знайдено');
            }
            const acceptedMessage = await Message.create({
                sender: { id: senderId, model: 'Barber' },
                receiver: { id: receiverId, model: 'User' },
                text: text,
                service: msg.service,
                msgStatus: 'sent',
            });

            await Message.findByIdAndUpdate(msgId, { reply: acceptedMessage._id }, { new: true });

            return { message: 'Запит успішно прийнято', acceptedMessage: acceptedMessage };
        } catch (error) {
            console.error('Помилка при приймані запиту:', error);
            throw error;
        }
    }
}

export default new MessageService();
