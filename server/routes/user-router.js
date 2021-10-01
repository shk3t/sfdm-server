const Router = require('express')
const router = Router()
const userController = require('../controllers/UserController')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.get)
router.put('/', userController.update)
router.delete('/:id', userController.delete)

module.exports = router