import { Router } from 'express'
import WeekController from '../controllers/weekController.js'
import { checkAuth } from '../middleware/checkauth-middleware.js'

const router = new Router()

router.post('/createWeek/:id', checkAuth, WeekController.createWeek)

router.get('/getWeeks/:id', checkAuth, WeekController.getWeeks)

router.get('/getDays/:id', checkAuth, WeekController.getValidDays)

router.get('/getSlots/:barberId/:dayId', checkAuth, WeekController.getValidSlots)

router.put('/updateWeek/:id', checkAuth, WeekController.updateSlots)
export default router