const Router = require('express')
const router = Router()
const bloggerController = require('../controllers/BloggerController')

router.post('/', bloggerController.createTags)
router.get('/', bloggerController.getAllTags)
router.delete('/', bloggerController.deleteTags)

module.exports = router