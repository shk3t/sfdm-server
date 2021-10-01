const db = require('../db')
const {DataTypes} = require("sequelize")
const ApiError = require('../errors/ApiError')
const BloggerService = require('../services/BloggerService')

class BloggerController {
    async create(req, res, next) {
        try {
            const {id, name, surname, about} = req.body
            const blogger = await BloggerService.create(id, name, surname, about)
            res.json(blogger)
        } catch (e) {
            res.json(e.message)
        }
    }

    async getAll(req, res, next) {
        const bloggers = await BloggerService.getAll()
        res.json(bloggers)
    }

    async get(req, res, next) {
        try {
            const {id} = req.params
            const blogger = await BloggerService.get(id)
            res.json(blogger)
        } catch (e) {
            res.json(e.message)
        }
    }

    async update(req, res, next) {

    }

    async delete(req, res, next) {

    }
}

module.exports = new BloggerController()