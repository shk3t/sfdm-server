const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Blogger = sequelize.define('blogger', {
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    about: {type: DataTypes.TEXT, defaultValue: ''},
    // profilePhoto: {}, //TODO
    // rating: {type: DataTypes.NUMERIC, defaultValue: 0, min: 0, max: 5}, //TODO
})
//TODO make required foreign key

const Case = sequelize.define('case', {
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})

const Rate = sequelize.define('rate', {
    value: {type: DataTypes.NUMERIC, allowNull: false, min: 0, max: 5}
    // ownerId: {type: DataTypes.INTEGER, allowNull: false, unique: true}
})

Blogger.hasMany(Rate)
Rate.belongsTo(Blogger)
Blogger.hasMany(Case)
Case.belongsTo(Blogger)

module.exports = {Blogger, Case, Rate}