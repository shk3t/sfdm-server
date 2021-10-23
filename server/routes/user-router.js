const Router = require('express')
const router = Router()
const userController = require('../controllers/UserController')

router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/', userController.update)
router.delete('/:id', userController.delete)

router.post('/rates/', userController.addRates)
router.get('/rates/:destinationId', userController.getRates)
router.delete('/rates/:destinationId', userController.cleanRates)

module.exports = router