import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import barberRoute from './routes/barber.js'
import weekRoute from './routes/week.js'
import messageRoute from './routes/message.js'
const app = express()
dotenv.config()

const PORT = process.env.PORT || 3005
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(fileUpload())
app.use(express.json())
app.use('/static', express.static('uploads'));

app.use('/api/auth', authRoute)
app.use('/api/barber', barberRoute)
app.use('/api/week', weekRoute)
app.use('/api/msg', messageRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.i7ztjje.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            {

            }
        )
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (error) {
        console.log(error);
    }
}
start()