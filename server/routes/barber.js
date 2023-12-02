import { Router } from 'express'
import BarberController from '../controllers/barberController.js'
import { checkAuth } from '../middleware/checkauth-middleware.js'
import { isAdmin } from '../middleware/isAdmin-middleware.js'
const router = new Router()

router.post('/register', isAdmin, BarberController.registration)

router.post('/login', BarberController.login)

router.get('/me', checkAuth, BarberController.getMe)

router.put('/update/:id', isAdmin, BarberController.updateBarber)

router.get('/getAllBarbers', BarberController.getAllBarbers)

router.delete('/delete/:id', BarberController.deleteMe)

export default router