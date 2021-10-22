const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User, Token, Rate} = require('./user-model')
const {Blogger, Case, Tag, Platform, BloggerPlatform, BloggerTag} = require('./blogger-model')

//todo relations
User.hasOne(Blogger)
Blogger.belongsTo(User)

module.exports = {
    User, Token, Rate,
    Blogger, Case, Tag, Platform, BloggerTag, BloggerPlatform,
    //todo
}