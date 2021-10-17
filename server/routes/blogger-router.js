const Router = require('express')
const router = Router()
const bloggerController = require('../controllers/BloggerController')

router.post('/', bloggerController.create)
router.get('/', bloggerController.getAll)
router.get('/:id', bloggerController.get)
router.put('/', bloggerController.update)
router.delete('/:id', bloggerController.delete)

router.post('/cases/', bloggerController.addCases)
router.get('/cases/:bloggerId', bloggerController.getCases)
router.delete('/cases/:bloggerId', bloggerController.cleanCases)

module.exports = router