const ApiError = require('../errors/ApiError')

module.exports = function (req, res, next) {
    try {

    } catch (e) {
        next(ApiError.unauthorizedError())
    }
}
