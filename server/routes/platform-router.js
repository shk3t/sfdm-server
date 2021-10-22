const Router = require('express')
const router = Router()
const bloggerController = require('../controllers/BloggerController')

router.post('/', bloggerController.createPlatforms)
router.get('/', bloggerController.getAllPlatforms)
router.delete('/', bloggerController.deletePlatforms)

module.exports = router