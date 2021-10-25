const {
    Blogger, Case, Tag, Platform, BloggerTag, BloggerPlatform,
    Rate,
} = require('../models/models')
const UserService = require('./UserService')
const BloggerDto = require('../dtos/BloggerDto')

class BloggerService {
    async create(id, name, surname, about, cases, tags, platforms) {
        await Blogger.create({id, name, surname, about, userId: id})
        await this.addBloggerCases(id, cases)
        await this.addBloggerTags(id, tags)
        await this.addBloggerPlatforms(id, platforms)
    }

    async getAll(page, limit) {
        page = page || 1
        limit = limit || 9
        const offset = (page - 1) * limit
        const {count, rows} = await Blogger.findAndCountAll({limit, offset, attributes: ['id']})
        const bloggerDtos = await Promise.all(rows.map(row => this.getOne(row.id)))
        return {count, bloggers: bloggerDtos}
    }

    async getOne(id) {
        const blogger = await Blogger.findByPk(id)
        if (blogger != null) {
            const cases = await this.getBloggerCases(id)
            const tags = await this.getBloggerTags(id)
            const platforms = await this.getBloggerPlatforms(id)
            const rating = await UserService.calculateRating(id)
            return new BloggerDto({blogger, cases, tags, platforms, rating})
        }
        return null
    }

    async update(id, name, surname, about) {
        await Blogger.update({name, surname, about}, {where: {id: id}})
    }

    async delete(id) {
        await Blogger.destroy({where: {id: id}})
    }

    async createTags(tags) {
        for (const name of tags) {
            try {
                await Tag.create({name})
            } catch {}
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
            try {
                await Platform.create({name})
            } catch {}
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
        if (cases)
            for (const {name, date} of cases) {
                await Case.create({name, date, bloggerId})
            }
    }

    async getBloggerCases(bloggerId) {
        return await Case.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanBloggerCases(bloggerId) {
        await Case.destroy({where: {bloggerId: bloggerId}})
    }

    async addBloggerTags(bloggerId, tags) {
        if (tags)
            for (const tagName of tags) {
                try {
                    await BloggerTag.create({bloggerId, tagName})
                } catch {}
            }
    }

    async getBloggerTags(bloggerId) {
        return await BloggerTag.findAll({where: {bloggerId: bloggerId}})
    }

    async cleanBloggerTags(bloggerId) {
        await BloggerTag.destroy({where: {bloggerId: bloggerId}})
    }

    async addBloggerPlatforms(bloggerId, platforms) {
        if (platforms)
            for (const {name, subscribers} of platforms) {
                try {
                    await BloggerPlatform.create({bloggerId, platformName: name, subscribers})
                } catch {}
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