const {Blogger, Case} = require('../models/models')
const ApiError = require("../errors/ApiError");

class ValidationService {
    static async enteredId(id) {
        if (!id) {
            throw ApiError.badRequest('No id was entered')
        }
    }
}

module.exports = ValidationService