const {Blogger, Case} = require('../models/models')
const ApiError = require("../errors/ApiError");
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
        const cases = await blogger.getCases(id)
        return {blogger, cases}
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
        // TODO Blogger.getCases()
        return await Case.findAll({where: {bloggerId: bloggerId}})
        // return await Blogger.findByPk(bloggerId).then(blogger => blogger.getCases())
    }

    async cleanCases(bloggerId) {
        await Case.destroy({where: {bloggerId: bloggerId}})
    }
}

module.exports = new BloggerService()