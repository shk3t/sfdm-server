const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User, Token, Rate} = require('./user-model')
const {Blogger, Case} = require('./blogger-model')

//todo relations
User.hasOne(Blogger)
Blogger.belongsTo(User)

module.exports = {
    User, Token,
    Blogger, Case, Rate,
    //todo
}