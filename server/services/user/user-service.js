import User from '../../models/user-model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import UserDto from '../../dtos/user-dto.js';
import ApiError from '../../exceptions/api-error.js'
class UserService {
    async registration(username, password, phoneNumber) {
        const isUsed = await User.findOne({ phoneNumber })
        if (isUsed) {
            throw ApiError.BadRequest('На цей номер уже зареєстрований акаунт')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({
            username,
            password: hash,
            phoneNumber: phoneNumber,
            status: 'User'
        })
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )
        await newUser.save(newUser)
        const userDto = new UserDto(newUser);
        return { user: userDto, token, message: 'Регістрація пройшла успішно.', }
    }

    async login(phoneNumber, password) {
        const user = await User.findOne({ phoneNumber })
        if (!user) {
            throw ApiError.BadRequest('Такого юзера не існує')
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            throw ApiError.BadRequest('Неправильний пароль')
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )

        const userDto = new UserDto(user);
        return {
            token,
            user: userDto,
            message: 'Ви зайшли в систему.',
        }
    }

    async getMe(userId) {
        console.log(userId)
        const user = await User.findById(userId)
        console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Такого юзера неіснує')
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )
        const userDto = new UserDto(user);

        return {
            user: userDto,
            token,
        }
    }
}

export default new UserService();