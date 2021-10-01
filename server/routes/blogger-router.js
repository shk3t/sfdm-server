const Router = require('express')
const router = Router()
const bloggerController = require('../controllers/BloggerController')

router.post('/', bloggerController.create)
router.get('/', bloggerController.getAll)
router.get('/:id', bloggerController.get)
router.put('/', bloggerController.update)
router.delete('/:id', bloggerController.delete)

module.exports = router