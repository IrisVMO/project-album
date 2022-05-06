const Sequelize = require('sequelize')

const {
  usernameDB,
  passwordDB,
  devDB,
  hostDB,
  dialectDB
} = require('./config')

const db = new Sequelize(devDB, usernameDB, passwordDB, {
  host: hostDB,
  dialect: dialectDB,
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// db.sync({ alter: true, force: true })
//   .catch(Error)

module.exports = db
