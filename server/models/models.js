const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Person = sequelize.define('person', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING}
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING}
})

Person.hasMany(Post)
Post.belongsTo(Person)

module.exports = {
    Person,
    Post
}