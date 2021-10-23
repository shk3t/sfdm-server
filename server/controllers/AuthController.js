const AuthService = require('../services/AuthService')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await AuthService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(userData)
        } catch (e) {
            res.json(e.stack)
        }
    }

    async login(req, res, next) {
        try {

            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async logout(req, res, next) {
        try {

            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async activate(req, res, next) {
        try {

            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }

    async refresh(req, res, next) {
        try {

            res.json('ok')
        } catch (e) {
            res.json(e.stack)
        }
    }
}

module.exports = new AuthController()