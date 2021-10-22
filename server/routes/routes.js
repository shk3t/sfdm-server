const Routes = require('express')
const router = Routes()
const authRouter = require('./auth-router')
const userRouter = require('./user-router')
const bloggerRouter = require('./blogger-router')
const tagRouter = require('./tag-router')
const platformRouter = require('./platform-router')

// router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/bloggers', bloggerRouter)
router.use('/tags', tagRouter)
router.use('/platforms', platformRouter)

module.exports = router