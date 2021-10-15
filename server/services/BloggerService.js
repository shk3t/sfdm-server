const {Blogger, Case} = require('../models/models')
const ApiError = require("../errors/ApiError");
const ValidationService = require("./ValidationService");

class BloggerService {

    async create(id, name, surname, about, cases) {
        if (!id || !name || !surname) {
            throw ApiError.badRequest('Have no id or name or surname')
        }
        //TODO make validation: existing id
        const createdBlogger = await Blogger.create({id, name, surname, about, userId: id})
        let createdCases = []
        for (const {name, date} of cases) {
            createdCases.push(await Case.create({name, date, bloggerId: id}))
        }
        return {blogger: createdBlogger, cases: createdCases}
    }

    async getAll() {
        return await Blogger.findAll()
    }

    async get(id) {
        await ValidationService.enteredId(id)
        return await Blogger.findOne({where: {id: id}})
    }

    async update(id, name, surname, about) {
        await ValidationService.enteredId(id)
        //TODO make validation: existing id
        return await Blogger.update({name, surname, about}, {where: {id: id}})
    }

    async delete(id) {
        await ValidationService.enteredId(id)
        return await Blogger.destroy({where: {id: id}})
        //TODO clean all cases
    }

    // async getAllCases(id) {
    //     if (!id) {
    //         throw ApiError.badRequest('Have no id')
    //     }
    //     return await Case.create({id, name, surname, about, userId: id})
    // }
}

module.exports = new BloggerService()