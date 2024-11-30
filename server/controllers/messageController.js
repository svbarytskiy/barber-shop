import MessageService from '../services/message/message-service.js'

class MessageController {
    async createMessage(req, res, next) {
        try {
            const { service, time, text, receiver } = req.body;
            const sender = req.params.id;
            const msgData = await MessageService.createMessage(sender, service, time, text, receiver)
            return res.json(msgData);
        } catch (e) {
            next(e)
        }

    }

    async getAllMessages(req, res, next) {
        try {
            const id = req.params.id;
            console.log(id)
            const msgs = await MessageService.getAllMessages(id)
            return res.json(msgs);
        } catch (e) {
            next(e)
        }

    }

    async declineRequest(req, res, next) {
        try {
            const msgId = req.params.id;
            const { sender, text, receiver } = req.body;
            const msgs = await MessageService.declineRequest(msgId, sender, text, receiver)
            return res.json(msgs);
        } catch (e) {
            next(e)
        }
    }
    async acceptRequest(req, res, next) {
        try {
            const msgId = req.params.id;
            const { sender, text, receiver } = req.body;
            const msgs = await MessageService.acceptRequest(msgId, sender, text, receiver)
            return res.json(msgs);
        } catch (e) {
            next(e)
        }
    }
}

export default new MessageController();