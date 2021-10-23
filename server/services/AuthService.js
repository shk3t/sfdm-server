const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const {User, Token} = require('../models/models')
const UserDto = require('../dtos/UserDto')
const UserService = require('./UserService')

class AuthService {
    async registration(email, password) {
        const candidate = await UserService.getOne(email)
        if (!candidate) {
            const hashPassword = await bcrypt.hash(password, 228)
            const activationLink = uuid.v4()
            const user = await UserService.create(email, hashPassword, activationLink)
            await this.sendActivationMail(email, activationLink)
            const userDto = new UserDto(user)
            const tokens = await this.generateTokens({...userDto})
            await this.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }

    async sendActivationMail(to, link) {

    }

    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId: userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({userId, refreshToken})
    }
}

module.exports = new AuthService()