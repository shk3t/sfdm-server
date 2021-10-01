const Routes = require('express')
const router = Routes()
const authRouter = require('./auth-router')
const userRouter = require('./user-router')
const bloggerRouter = require('./blogger-router')

// router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/bloggers', bloggerRouter)

module.exports = router