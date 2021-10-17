const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Blogger = sequelize.define('blogger', {
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    about: {type: DataTypes.TEXT, defaultValue: ''},
    // profilePhoto: {}, //TODO
    //TODO social networks
    //TODO tags
})

const Case = sequelize.define('case', {
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})


Blogger.hasMany(Case)
Case.belongsTo(Blogger)

module.exports = {Blogger, Case}