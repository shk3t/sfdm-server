require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/routes')
const errorHandler = require('./middlewares/error-handling-middleware')

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json())
app.use('/api', router)
app.use(cors())

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()