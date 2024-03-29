const Sequelize = require('sequelize')

const db = new Sequelize('shortURL', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = db
