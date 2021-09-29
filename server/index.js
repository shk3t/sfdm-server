require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const sequelize = require('./db')
const models = require('./models/models')

const PORT = process.env.PORT || 5000;
const app = express()
app.use(express.json())
app.use('/api', userRouter)
app.use(cors())

const start = async () => {
    try {
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()