const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Blogger = sequelize.define('blogger', {
    name: {type: DataTypes.STRING, required: true},
    surname: {type: DataTypes.STRING, required: true},
    about: {type: DataTypes.TEXT, defaultValue: ''},
    // profilePhoto: {}, //TODO
    // rating: {type: DataTypes.NUMERIC, defaultValue: 0, min: 0, max: 5}, //TODO
})
//TODO make required foreign key

const Case = sequelize.define('case', {
    name: {type: DataTypes.STRING, required: true},
    date: {type: DataTypes.DATE, required: true}
})

const Rate = sequelize.define('rate', {
    value: {type: DataTypes.NUMERIC, required: true, min: 0, max: 5},
    ownerId: {type: DataTypes.INTEGER, required: true, unique: true}
})

Blogger.hasMany(Rate)
Rate.belongsTo(Blogger)
Blogger.hasMany(Case)
Case.belongsTo(Blogger)

module.exports = {Blogger, Case, Rate}