const {Blogger, Case} = require('../models/models')
const ApiError = require("../errors/ApiError");
const UserService = require('../services/UserService')
const ValidationService = require("./ValidationService");

class BloggerService {
    async create(id, name, surname, about, cases) {
        await Blogger.create({id, name, surname, about, userId: id})
        await this.addCases(id, cases)
    }

    async getAll() {
        return await Blogger.findAll()
    }

    async get(id) {
        const blogger = await Blogger.findByPk(id)
        blogger.dataValues.cases = await blogger.getCases(id)
        blogger.dataValues.rating = await UserService.calculateRating(id)
        return blogger
    }

    async update(id, name, surname, about) {
        await Blogger.update({name, surname, about}, {where: {id: id}})
    }

    async delete(id) {
        await this.cleanCases(id)
        await Blogger.destroy({where: {id: id}})
    }

    async addCases(bloggerId, cases) {
        for (const {name, date} of cases) {
            await Case.create({name, date, bloggerId: bloggerId})
        }
    }

    async getCases(bloggerId) {
        return await Case.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanCases(bloggerId) {
        await Case.destroy({where: {bloggerId: bloggerId}})
    }
}

module.exports = new BloggerService()