import jwt from 'jsonwebtoken'
import ApiError from '../exceptions/api-error.js';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    console.log(req.headers.authorization)
    console.log('кіло амфетаміну')
    if (token) {
        console.log(token)
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