const {Blogger} = require('../models/models')
const ApiError = require("../errors/ApiError");

class UserService {
    async create(id, name, surname, about) {
        if(!id || !name || !surname) {
            throw ApiError.badRequest('Have no id or name or surname')
        }
        return await Blogger.create({id, name, surname, about, userId: id})  //Todo connect with user
    }

    async getAll() {
        return await Blogger.findAll()
    }

    async get(id) {
        if (!id) {
            throw ApiError.badRequest('Have no id')
        }
        return await Blogger.findByPk(id)
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

}

module.exports = new UserService()