const uuid = require("uuid")
const path = require("path")
const fs = require("fs")
const {User, Rate} = require('../models/models')

//TODO add authorization
class UserService {


    async create(email, password, activationLink) {
        await User.create({email, password, activationLink})
    }

    async getAll(page, limit) {
        page = page || 1
        limit = limit || 9
        const offset = (page - 1) * limit
        return await User.findAndCountAll({limit, offset})
    }

    async getOne(id) {
        if (!isNaN(id))
            return await User.findByPk(id)
        else
            return await User.findOne({where: {email: id}})
    }

    async update(id, email, password, image) {
        let fileName = undefined
        if (image) {
            await this.deleteImage(id)
            fileName = uuid.v4() + '.jpg'
            await image.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        await User.update({id, email, password, image: fileName}, {where: {id: id}})
    }

    async delete(id) {
        await this.deleteImage(id)
        await User.destroy({where: {id: id}})
    }

    async deleteImage(id) {
        const {image} = await this.get(id)
        if (image)
            await fs.unlinkSync(path.resolve(__dirname, '..', 'static', image))
    }

    async addRates(destinationId, rates) {
        for (const {value, sourceId} of rates) {
            await Rate.create({value, sourceId, destinationId})
        }
    }

    async getRates(destinationId) {
        return await Rate.findAll({where: {destinationId: destinationId}})
    }

    async cleanRates(destinationId) {
        await Rate.destroy({where: {bloggerId: destinationId}})
    }

    async calculateRating(destinationId) {
        const rateSum = await Rate.sum('value', {where: {destinationId: destinationId}})
        const rateCount = await Rate.count({where: {destinationId: destinationId}})
        return Number((rateSum / rateCount).toFixed(2))
    }

}

module.exports = new UserService()