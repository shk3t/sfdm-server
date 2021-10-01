const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Platform = sequelize.define('platform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, required: true}
})

const Subscribers = sequelize.define('subscribers', {
    count: {type: DataTypes.STRING, unique: true, required: true}
})

Subscribers.hasOne(Platform)

module.exports = {Platform, Subscribers}