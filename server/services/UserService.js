const {User, Blogger, Rate} = require('../models/models')
const ApiError = require("../errors/ApiError");

//TODO add authorization
class UserService {
    async create(email, password) {
        await User.create({email, password})
    }

    async getAll() {
        return await User.findAll()
    }

    async get(id) {
        return await User.findByPk(id)
    }

    async update(email, password) {
        await User.update({email, password}, {where: {id: id}})
    }

    async delete(id) {
        await Blogger.destroy({where: {id: id}})
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