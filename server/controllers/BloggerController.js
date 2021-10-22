const db = require('../db')
const {DataTypes} = require("sequelize")
const ApiError = require('../errors/ApiError')
const BloggerService = require('../services/BloggerService')
const {Case, Tag, Platform} = require("../models/models");

class BloggerController {
    async create(req, res, next) {
        try {
            const {id, name, surname, about, cases} = req.body
            await BloggerService.create(id, name, surname, about, cases)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getAll(req, res, next) {
        try {
            const bloggers = await BloggerService.getAll()
            res.json(bloggers)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async get(req, res, next) {
        try {
            const {id} = req.params
            const blogger = await BloggerService.get(id)
            res.json(blogger)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, surname, about} = req.body
            await BloggerService.update(id, name, surname, about)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await BloggerService.delete(id)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async createTags(req, res, next) {
        try {
            const {tags} = req.body
            await BloggerService.createTags(tags)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getAllTags(req, res, next) {
        try {
            const tags = await BloggerService.getAllTags()
            res.json(tags)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async deleteTags(req, res, next) {
        try {
            const {tags} = req.body
            await BloggerService.deleteTags(tags)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async createPlatforms(req, res, next) {
        try {
            const {platforms} = req.body
            await BloggerService.createPlatforms(platforms)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getAllPlatforms(req, res, next) {
        try {
            const platforms = await BloggerService.getAllPlatforms()
            res.json(platforms)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async deletePlatforms(req, res, next) {
        try {
            const {platforms} = req.body
            await BloggerService.deletePlatforms(platforms)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async addBloggerCases(req, res, next) {
        try {
            const {bloggerId, cases} = req.body
            await BloggerService.addBloggerCases(bloggerId, cases)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getBloggerCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            const cases = await BloggerService.getBloggerCases(bloggerId)
            res.json(cases)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async cleanBloggerCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerCases(bloggerId)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async addBloggerTags(req, res, next) {
        try {
            const {bloggerId, tags} = req.body
            await BloggerService.addBloggerTags(bloggerId, tags)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getBloggerTags(req, res, next) {
        try {
            const {bloggerId} = req.params
            const tags = await BloggerService.getBloggerTags(bloggerId)
            res.json(tags)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async cleanBloggerTags(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerTags(bloggerId)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async addBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId, platforms} = req.body
            await BloggerService.addBloggerPlatforms(bloggerId, platforms)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId} = req.params
            const platforms = await BloggerService.getBloggerPlatforms(bloggerId)
            res.json(platforms)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async cleanBloggerPlatforms(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanBloggerPlatforms(bloggerId)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }
}

module.exports = new BloggerController()