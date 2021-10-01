const db = require('../db')
const ApiError = require('../errors/ApiError')
const User = require('../models/user-model')

class AuthController {
    async registration(req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req, res, next) {
        try {
            return res.json('refreshed')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()