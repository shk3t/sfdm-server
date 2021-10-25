require('dotenv').config()
const express = require('express')
const path = require('path')
const fsExtra = require("fs-extra")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const router = require('./routes/routes')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: process.env.DB_DROP === 'true'})
        fsExtra.emptyDirSync(path.resolve(__dirname, 'static'))  // static files deleting
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()