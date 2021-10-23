const UserService = require('../services/UserService')

class UserController {
    async create(req, res, next) {
        try {
            const {email, password} = req.body
            await UserService.create(email, password)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getAll(req, res, next) {
        try {
            let {page, limit} = req.query
            const users = await UserService.getAll(page, limit)
            res.json(users)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const user = await UserService.getOne(id)
            res.json(user)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async update(req, res, next) {
        try {
            const {id, email, password} = req.body
            const image = req.files ? req.files.image : undefined
            await UserService.update(id, email, password, image)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await UserService.delete(id)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async addRates(req, res, next) {
        try {
            const {destinationId, rates} = req.body
            await UserService.addRates(destinationId, rates)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async getRates(req, res, next) {
        try {
            const {destinationId} = req.params
            const rates = await UserService.getRates(destinationId)
            res.json(rates)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async cleanRates(req, res, next) {
        try {
            const {destinationId} = req.params
            await UserService.cleanRates(destinationId)
            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

}

module.exports = new UserController()