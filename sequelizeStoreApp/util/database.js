
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'sqlStoreApp',
    'root',
    'student',
    {
        dialect: 'mysql',
        host: 'localhost'
    })

module.exports = sequelize;