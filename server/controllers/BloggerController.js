const db = require('../db')
const {DataTypes} = require("sequelize")
const ApiError = require('../errors/ApiError')
const BloggerService = require('../services/BloggerService')
const {Case} = require("../models/models");

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

    async addCases(req, res, next) {
        try {
            const {bloggerId, cases} = req.body
            await BloggerService.addCases(bloggerId, cases)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            const cases = await BloggerService.getCases(bloggerId)
            res.json(cases)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async cleanCases(req, res, next) {
        try {
            const {bloggerId} = req.params
            await BloggerService.cleanCases(bloggerId)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }
}

module.exports = new BloggerController()