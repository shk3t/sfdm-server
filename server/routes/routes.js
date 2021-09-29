const Routes = require('express')
const router = Routes()
const userRouter = require('./user-router')

router.use('/user', userRouter)

module.exports = router