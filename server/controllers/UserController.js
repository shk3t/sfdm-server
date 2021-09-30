const db = require('../db')
const ApiError = require('../errors/ApiError')
const {Person} = require('../models/models')

class UserController {
    async create(req, res) {
        const {name, surname} = req.body
        const person = await Person.create({name, surname})
        return res.json(person)
    }

    async getAll(req, res) {
        const persons = await Person.findAll()
        return res.json(persons)
    }

    async get(req, res) {
        // const {id} = req.query
        // if (!id) {
        //     return next(ApiError.badRequest('No id'))
        // }
        // res.json(id)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new UserController()