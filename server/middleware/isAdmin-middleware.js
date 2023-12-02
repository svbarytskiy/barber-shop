import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/api-error.js';
import User from '../models/user-model.js';

export const isAdmin = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            req.userId = decoded.id;

            if (decoded) {
                const user = await User.findById(decoded.id);

                if (user && user.status === 'Admin') {
                    next();
                } else {
                    // Користувач не є адміністратором
                    throw new Error('User is not an admin');
                }
            } else {
                // Не вдалося розкодувати токен
                throw new Error('Decoding error');
            }
        } catch (error) {
            // Виникла помилка під час обробки токену або інша помилка
            return next(ApiError.UnauthorizedError());
        }
    } else {
        // Відсутній токен
        return next(ApiError.UnauthorizedError());
    }
};
