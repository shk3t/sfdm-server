const db = require('../db')
const ApiError = require('../errors/ApiError')

class UserController {
    async createUser(req, res) {
        const {name, surname} = req.body
        // const newPerson = await db.query(
        //     'INSERT INTO guys.person(name, surname) values($1, $2) RETURNING *', [name, surname])
        // res.json(newPerson)
        res.json(name, surname).catch()
    }

    async getUsers(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('No id'))
        }
        res.json(id)
    }

    async getOneUser(req, res) {
    }

    async updateUser(req, res) {

    }

    async deleteUser(req, res) {

    }
}

module.exports = new UserController()