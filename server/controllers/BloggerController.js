const BloggerService = require('../services/BloggerService')

class BloggerController {
    async create(req, res, next) {
        try {
            const {id, name, surname, about, cases, tags, platforms} = req.body
            await BloggerService.create(id, name, surname, about, cases, tags, platforms)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            let {page, limit} = req.query
            const bloggers = await BloggerService.getAll(page, limit)
            res.json(bloggers)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const blogger = await BloggerService.getOne(id)
            res.json(blogger)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, surname, about} = req.body
            await BloggerService.update(id, name, surname, about)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await BloggerService.delete(id)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async createTags(req, res, next) {
        try {
            const tags = req.body
            await BloggerService.createTags(tags)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getAllTags(req, res, next) {
        try {
            const tags = await BloggerService.getAllTags()
            res.json(tags)
        } catch (e) {
            next(e)
        }
    }

    async deleteTags(req, res, next) {
        try {
            const tags = req.body
            await BloggerService.deleteTags(tags)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async createPlatforms(req, res, next) {
        try {
            const platforms = req.body
            await BloggerService.createPlatforms(platforms)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getAllPlatforms(req, res, next) {
        try {
            const platforms = await BloggerService.getAllPlatforms()
            res.json(platforms)
        } catch (e) {
            next(e)
        }
    }

    async deletePlatforms(req, res, next) {
        try {
            const platforms = req.body
            await BloggerService.deletePlatforms(platforms)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async addBloggerCases(req, res, next) {
        try {
            const {bloggerId, cases} = req.body
            await BloggerService.addBloggerCases(bloggerId, cases)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getBloggerCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            const cases = await BloggerService.getBloggerCases(bloggerId)
            res.json(cases)
        } catch (e) {
            next(e)
        }
    }

    async cleanBloggerCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerCases(bloggerId)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async addBloggerTags(req, res, next) {
        try {
            const {bloggerId, tags} = req.body
            await BloggerService.addBloggerTags(bloggerId, tags)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getBloggerTags(req, res, next) {
        try {
            const {bloggerId} = req.params
            const tags = await BloggerService.getBloggerTags(bloggerId)
            res.json(tags)
        } catch (e) {
            next(e)
        }
    }

    async cleanBloggerTags(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerTags(bloggerId)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async addBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId, platforms} = req.body
            await BloggerService.addBloggerPlatforms(bloggerId, platforms)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async getBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId} = req.params
            const platforms = await BloggerService.getBloggerPlatforms(bloggerId)
            res.json(platforms)
        } catch (e) {
            next(e)
        }
    }

    async cleanBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerPlatforms(bloggerId)
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BloggerController()