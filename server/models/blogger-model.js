const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Blogger = sequelize.define('blogger', {
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    about: {type: DataTypes.TEXT, defaultValue: ''},
    // profilePhoto: {}, //TODO
    rating: {type: DataTypes.NUMERIC, defaultValue: 0, min: 0, max: 5}, //TODO
})

const Case = sequelize.define('case', {
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})

//TODO replace BloggerService.js with ORM operations
Blogger.hasMany(Case)
Case.belongsTo(Blogger)

module.exports = {Blogger, Case}