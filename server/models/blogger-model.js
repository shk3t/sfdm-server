const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Blogger = sequelize.define('blogger', {
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    about: {type: DataTypes.TEXT, defaultValue: ''},
})

const Case = sequelize.define('case', {
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false}
})

const Tag = sequelize.define('tag', {
    name: {type: DataTypes.STRING, primaryKey: true},
})

const Platform = sequelize.define('platform', {
    name: {type: DataTypes.STRING, primaryKey: true},
})

const BloggerTag = sequelize.define('blogger_tag')
const BloggerPlatform = sequelize.define('blogger_platform', {
    subscribers: {type: DataTypes.INTEGER, allowNull: false}
})

Blogger.hasMany(Case)
Case.belongsTo(Blogger)

Tag.belongsToMany(Blogger, {through: 'blogger_tag'})
Platform.belongsToMany(Blogger, {through: 'blogger_platform'})

module.exports = {Blogger, Case, Tag, Platform, BloggerTag, BloggerPlatform}