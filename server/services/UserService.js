const {User} = require('../models/models')
const ApiError = require("../errors/ApiError");

class UserService {
    async create(email, password) {
        if(!email || !password) {
            throw ApiError.badRequest('Have no email or password')
        }
        return await User.create({email, password})
    }

    async getAll() {
        return await User.findAll()
    }

    async get(id) {
        if (!id) {
            throw ApiError.badRequest('Have no id')
        }
        return await User.findByPk(id)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

}

module.exports = new UserService()