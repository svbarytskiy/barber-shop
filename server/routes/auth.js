import { Router } from 'express'
import UserController from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkauth-middleware.js'
const router = new Router()

// Register
// http://localhost:3002/api/auth/register
router.post('/register', UserController.registration)

// Login
// http://localhost:3002/api/auth/login
router.post('/login', UserController.login)

// Get Me
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, UserController.getMe)

export default router