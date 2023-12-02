import jwt from 'jsonwebtoken'
import ApiError from '../exceptions/api-error.js';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return next(ApiError.UnauthorizedError());
        }
    } else {
        return next(ApiError.UnauthorizedError());
    }
}