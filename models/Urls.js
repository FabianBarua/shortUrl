const Sequelize = require('sequelize')
const db = require('../db/config')

const Urls = db.define(
  'urls',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    param: Sequelize.STRING(50),
    url: Sequelize.STRING(255)
  },
  {
    hooks: {
      beforeCreate (urls) {}
    }
  }
)

module.exports = Urls
