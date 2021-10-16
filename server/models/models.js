const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {User, Token} = require('./user-model')
const {Blogger, Case, Rate} = require('./blogger-model')

//todo relations
User.hasOne(Blogger)
Blogger.belongsTo(User)

User.hasMany(User, {foreignKey: 'sourceId'})
User.belongsToMany(User, {as: 'destinationId'})

module.exports = {
    User, Token,
    Blogger, Case, Rate,
    //todo
}