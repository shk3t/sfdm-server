const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {User, Token} = require('../models/models')
const UserDto = require('../dtos/UserDto')
const UserService = require('./UserService')
const ApiError = require('../errors/ApiError')


class AuthService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async registration(email, password) {
        const candidate = await UserService.getOne(email)
        if (candidate)
            throw ApiError.badRequest('Пользователь с таким email уже существует')
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT))
        const activationLink = uuid.v4()
        const user = await UserService.create(email, hashPassword, activationLink)
        await this.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = await this.generateTokens({...userDto})
        await this.saveToken(userDto.id, tokens.refreshToken)
        return {user: userDto, ...tokens}

    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink: activationLink}})
        if (user) {
            user.isActivated = true
            await user.save()
        }
    }

    async login(email, password) {
        const user = await UserService.getOne(email)
        if (!user)
            throw ApiError.badRequest('Пользователь с таким email не найден')
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals)
            throw ApiError.badRequest('Неверный пароль')
        const userDto = new UserDto(user)
        const tokens = await this.generateTokens({...userDto})
        await this.saveToken(userDto.id, tokens.refreshToken)
        return {user: userDto, ...tokens}
    }

    async logout(refreshToken) {
        await Token.destroy({where: {refreshToken: refreshToken}})
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const userData = this.validateToken(refreshToken, 'refresh')
        const tokenFromDb = await Token.findOne({where: {refreshToken: refreshToken}})
        if (!userData || !tokenFromDb)
            throw ApiError.unauthorizedError()
        const user = await UserService.getOne(userData.id)
        const userDto = new UserDto(user)
        const tokens = await this.generateTokens({...userDto})
        await this.saveToken(userDto.id, tokens.refreshToken)
        return {user: userDto, ...tokens}
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
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
            return await tokenData.save()
        }
        return await Token.create({userId, refreshToken})
    }

    async validateToken(token, type = 'access') {
        try {
            return jwt.verify(token, type === 'refresh' ?
                process.env.JWT_REFRESH_SECRET : process.env.JWT_ACCESS_SECRET)
        } catch {
            return null
        }
    }
}

module.exports = new AuthService()