const {validationResult} = require('express-validator')
const AuthService = require('../services/AuthService')
const ApiError = require('../errors/ApiError')

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
            const {email, password} = req.body
            const userData = await AuthService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await AuthService.activate(activationLink)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await AuthService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json('ok')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()