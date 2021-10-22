const Router = require('express')
const router = Router()
const bloggerController = require('../controllers/BloggerController')

router.post('/', bloggerController.create)
router.get('/', bloggerController.getAll)
router.get('/:id', bloggerController.get)
router.put('/', bloggerController.update)
router.delete('/:id', bloggerController.delete)

router.post('/cases/', bloggerController.addBloggerCases)
router.get('/cases/:bloggerId', bloggerController.getBloggerCases)
router.delete('/cases/:bloggerId', bloggerController.cleanBloggerCases)

router.post('/tags/', bloggerController.addBloggerTags)
router.get('/tags/:bloggerId', bloggerController.getBloggerTags)
router.delete('/tags/:bloggerId', bloggerController.cleanBloggerTags)

router.post('/platforms/', bloggerController.addBloggerPlatforms)
router.get('/platforms/:bloggerId', bloggerController.getBloggerPlatforms)
router.delete('/platforms/:bloggerId', bloggerController.cleanBloggerPlatforms)

module.exports = router