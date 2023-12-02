import BarberService from '../services/barber/barber-service.js'
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

class BarberController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка під час валідації', errors.array()))
            }
            const image = req.files.image;
            const { username, password, phoneNumber, haircut, hairDyeing, pedicure, manicure, hairExtension, hairStyling } = req.body;
            const barberOptions = { haircut, hairDyeing, pedicure, manicure, hairExtension, hairStyling }
            const userData = await BarberService.registration(username, password, phoneNumber, barberOptions, image);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            console.log(req.body)
            const { phoneNumber, password } = req.body;
            const userData = await BarberService.login(phoneNumber, password);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getMe(req, res, next) {
        try {
            const userId = req.userId;
            const userData = await BarberService.getMe(userId);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async deleteMe(req, res, next) {
        const barberId = req.params.id;
        try {
            const userData = await BarberService.deleteMe(barberId);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async updateBarber(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Помилка під час валідації', errors.array()))
            }
            const barberId = req.params.id;
            console.log(barberId)
            console.log(req.body)
            const image = req.files ? req.files.image : null;
            const { username, phoneNumber, haircut, hairDyeing, pedicure, manicure, hairExtension, hairStyling } = req.body;
            const barberOptions = { haircut, hairDyeing, pedicure, manicure, hairExtension, hairStyling }
            const barberData = await BarberService.updateBarber(username, phoneNumber, barberOptions, image, barberId);
            return res.json(barberData);
        } catch (e) {
            next(e);
        }
    }

    async getAllBarbers(req, res, next) {
        try {
            const barbers = await BarberService.getAllBarbers();
            return res.json(barbers);
        } catch (e) {
            next(e);
        }
    }
}

export default new BarberController();