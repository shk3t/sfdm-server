const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Platform = sequelize.define('platform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Subscribers = sequelize.define('subscribers', {
    count: {type: DataTypes.STRING, unique: true, allowNull: false}
})

Subscribers.hasOne(Platform)

module.exports = {Platform, Subscribers}