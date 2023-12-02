import Barber from '../../models/barber-model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import BarberDto from '../../dtos/barber-dto.js';
import ApiError from '../../exceptions/api-error.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs';
import { promises as fsPromises } from 'fs';

class BarberService {
    async registration(username, password, phoneNumber, barberOptions, image) {
        const isUsed = await Barber.findOne({ phoneNumber })
        if (isUsed) {
            throw ApiError.BadRequest('На цей номер уже зареєстрований акаунт')
        }

        const fileName = Date.now().toString() + image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const uploadDir = path.join(__dirname, '../../', 'uploads', phoneNumber);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const filePath = path.join(uploadDir, fileName);

        image.mv(filePath, (err) => {
            if (err) {
                throw ApiError.BadRequest('Фото не зайшло компютеру')
            } else {
                console.log('File moved successfully:', filePath);
            }
        });

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newBarber = new Barber({
            username,
            password: hash,
            phoneNumber: phoneNumber,
            services: barberOptions,
            image: fileName
        })

        const token = jwt.sign(
            {
                id: newBarber._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )
        await newBarber.save(newBarber)
        const barberDto = new BarberDto(newBarber);
        return { barber: barberDto, token, message: 'Регістрація пройшла успішно.', }
    }

    async updateBarber(username, phoneNumber, barberOptions, image, barberId) {
        const barber = await Barber.findById(barberId)

        if (phoneNumber != barber.phoneNumber) {
            const isUsed = await Barber.findOne({ phoneNumber })
            if (isUsed) {
                throw ApiError.BadRequest('На цей номер уже зареєстрований акаунт')
            }
        }
        const __dirname = dirname(fileURLToPath(import.meta.url));

        const updatePhoneNumberAndMoveFolder = async () => {
            const pastDirPath = path.join(__dirname, '../../', 'uploads', barber.phoneNumber);
            console.log('Аааааа заберіть мене звідси я вже не можу 1');
        
            if (fs.existsSync(pastDirPath)) {
                const newDirPath = path.join(__dirname, '../../', 'uploads', phoneNumber);
        
                console.log('Аааааа заберіть мене звідси я вже не можу 2');
        
                try {
                    await fsPromises.access(newDirPath);
                } catch (error) {
                    // Папки не існує, створіть її
                    await fsPromises.mkdir(newDirPath, { recursive: true });
                }
        
                console.log('Аааааа заберіть мене звідси я вже не можу 3');
        
                // Переміщення вмісту папки
                const files = await fsPromises.readdir(pastDirPath);
        
                for (const file of files) {
                    const sourcePath = path.join(pastDirPath, file);
                    const destinationPath = path.join(newDirPath, file);
        
                    await fsPromises.rename(sourcePath, destinationPath);
                }
        
                // Видалення порожньої вже попередньої папки
                await fsPromises.rmdir(pastDirPath);
        
                console.log('Якщо ти це бачиш, то експрес вирішив не творити суіцид');
            }
        
            barber.phoneNumber = phoneNumber;
        };


        const updatePhoto = async () => {
            const pastImagePath = path.join(__dirname, '../../', 'uploads', barber.phoneNumber, barber.image);
            if (fs.existsSync(pastImagePath)) {
                await fsPromises.unlink(pastImagePath);
            }
            const fileName = Date.now().toString() + image.name;
            const uploadDir = path.join(__dirname, '../../', 'uploads', phoneNumber);
            if (!fs.existsSync(uploadDir)) {
                await fsPromises.mkdir(uploadDir);
            }
            const filePath = path.join(uploadDir, fileName);
            await image.mv(filePath);
            barber.image = fileName;
        };

        if (image != null) {
            await updatePhoto();
        }
        if (barber.phoneNumber != phoneNumber) {
            await updatePhoneNumberAndMoveFolder();
        }
        barber.username = username;
        barber.phoneNumber = phoneNumber;
        barber.services = barberOptions;

        await barber.save();

        return { message: 'Редаговано успішно.' };
    }

    async login(phoneNumber, password) {
        const barber = await Barber.findOne({ phoneNumber })
        if (!barber) {
            throw ApiError.BadRequest('Такого юзера не існує')
        }

        const isPasswordCorrect = await bcrypt.compare(password, barber.password)

        if (!isPasswordCorrect) {
            throw ApiError.BadRequest('Неправильний пароль')
        }

        const token = jwt.sign(
            {
                id: barber._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )

        const barberDto = new BarberDto(barber);
        return {
            token,
            barber: barberDto,
            message: 'Ви зайшли в систему.',
        }
    }

    async getMe(barberId) {
        console.log(barberId)
        const barber = await Barber.findById(barberId)
        console.log(barber)
        if (!barber) {
            throw ApiError.BadRequest('Такого юзера неіснує')
        }

        const token = jwt.sign(
            {
                id: barber._id,
            },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30d' },
        )
        const barberDto = new BarberDto(barber);

        return {
            barber: barberDto,
            token,
        }
    }

    async deleteMe(barberId) {
        const barber = await Barber.findById(barberId);

        if (!barber) {
            throw ApiError.BadRequest('Барбер не знайдений');
        }

        const __dirname = dirname(fileURLToPath(import.meta.url));
        const uploadDir = path.join(__dirname, '../../uploads', barber.phoneNumber);

        if (fs.existsSync(uploadDir)) {
            fs.rmdirSync(uploadDir, { recursive: true });
            console.log(`Folder deleted successfully: ${uploadDir}`);
        }
        
        await Barber.findByIdAndDelete(barberId);

        return { message: 'Барбер та його фото успішно видалені.' };

    }

    async getAllBarbers() {
        const findedBarbers = await Barber.find();

        if (!findedBarbers || findedBarbers.length === 0) {
            throw ApiError.BadRequest('Барберів не знайдено');
        }
        const barbers = findedBarbers.map((barber) => new BarberDto(barber));

        return { barbers, message: 'Барбери успішно знайдені.' };

    }
}

export default new BarberService();