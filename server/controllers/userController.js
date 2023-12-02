import UserService from '../services/user/user-service.js'
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка під час валідації', errors.array()))
            }
            const { username, password, phoneNumber } = req.body;
            const userData = await UserService.registration(username, password, phoneNumber);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            console.log(req.body)
            const { phoneNumber, password } = req.body;
            const userData = await UserService.login(phoneNumber, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getMe(req, res, next) {
        try {
            const userId = req.userId;
            const userData = await UserService.getMe(userId);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}
export default new UserController();