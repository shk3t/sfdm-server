const {
    Blogger, Case, Tag, Platform, BloggerTag, BloggerPlatform,
    Rate,
} = require('../models/models')
const ApiError = require("../errors/ApiError");
const UserService = require('../services/UserService')
const ValidationService = require("./ValidationService");

//TODO add grouping and filtering
class BloggerService {
    async create(id, name, surname, about, cases) {
        await Blogger.create({id, name, surname, about, userId: id})
        await this.addBloggerCases(id, cases)
    }

    async getAll() {
        return await Blogger.findAll()
    }

    async get(id) {
        const blogger = await Blogger.findByPk(id)
        blogger.dataValues.cases = await this.getBloggerCases(id)
        blogger.dataValues.tags = await this.getBloggerTags(id)
        blogger.dataValues.platforms = await this.getBloggerPlatforms(id)
        blogger.dataValues.rating = await UserService.calculateRating(id)
        return blogger
    }

    async update(id, name, surname, about) {
        await Blogger.update({name, surname, about}, {where: {id: id}})
    }

    async delete(id) {
        await this.cleanBloggerCases(id)
        await Blogger.destroy({where: {id: id}})
    }

    async createTags(tags) {
        for (const name of tags) {
            await Tag.create({name})
        }
    }

    async getAllTags() {
        return await Tag.findAll()
    }

    async deleteTags(tags) {
        for (const name of tags) {
            await Tag.destroy({where: {name: name}})
        }
    }

    async createPlatforms(platforms) {
        for (const name of platforms) {
            await Platform.create({name})
        }
    }

    async getAllPlatforms() {
        return await Platform.findAll()
    }

    async deletePlatforms(platforms) {
        for (const name of platforms) {
            await Platform.destroy({where: {name: name}})
        }
    }

    async addBloggerCases(bloggerId, cases) {
        for (const {name, date} of cases) {
            await Case.create({name, date, bloggerId: bloggerId})
        }
    }

    async getBloggerCases(bloggerId) {
        return await Case.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanBloggerCases(bloggerId) {
        await Case.destroy({where: {bloggerId: bloggerId}})
    }

    async addBloggerTags(bloggerId, tags) {
        for (const tagName of tags) {
            await BloggerTag.create({bloggerId, tagName})
        }
    }

    async getBloggerTags(bloggerId) {
        return await BloggerTag.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanBloggerTags(bloggerId) {
        await BloggerTag.destroy({where: {bloggerId: bloggerId}})
    }

    async addBloggerPlatforms(bloggerId, platforms) {
        for (const {name, subscribers} of platforms) {
            await BloggerPlatform.create({bloggerId, platformName: name, subscribers})
        }
    }

    async getBloggerPlatforms(bloggerId) {
        return await BloggerPlatform.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanBloggerPlatforms(bloggerId) {
        await BloggerPlatform.destroy({where: {bloggerId: bloggerId}})
    }
}

module.exports = new BloggerService()