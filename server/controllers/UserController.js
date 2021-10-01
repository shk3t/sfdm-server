const db = require('../db')
const {DataTypes} = require("sequelize")
const ApiError = require('../errors/ApiError')
const UserService = require('../services/UserService')

class UserController {
    async create(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await UserService.create(email, password)
            res.json(user)
        } catch (e) {
            res.json(e.message)
        }
    }

    async getAll(req, res, next) {
        const users = await UserService.getAll()
        res.json(users)
    }

    async get(req, res, next) {
        try {
            const {id} = req.params
            const user = await UserService.get(id)
            res.json(user)
        } catch (e) {
            res.json(e.message)
        }
    }

    async update(req, res, next) {

    }

    async delete(req, res, next) {

    }
}

// id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// email: {type: DataTypes.STRING, unique: true, required: true},
// password: {type: DataTypes.STRING, required: true},
// role: {type: DataTypes.STRING, defaultValue: 'User'},
// isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
// activationLink: {type: DataTypes.STRING},

module.exports = new UserController()