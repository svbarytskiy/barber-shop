import { Router } from 'express'
import MessageController from '../controllers/messageController.js'

const router = new Router()

router.post('/createRequest/:id', MessageController.createMessage)
router.get('/getMsgs/:id', MessageController.getAllMessages)
router.post('/declineRequest/:id', MessageController.declineRequest)
router.post('/acceptRequest/:id', MessageController.acceptRequest)
export default router