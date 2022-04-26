require('dotenv-safe').config()

const port = process.env.PORT
const jwtAccessKey = process.env.JWT_KEY_ACCESS
const jwtRefreshKey = process.env.JWT_KEY_REFRESH
const mongodbUri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
const emailHelper = process.env.EMAIL
const passwordEmail= process.env.PASSWORD
const usernameDB = process.env.USER_DB
const passwordDB = process.env.PASSWORD_DB
const devDB = process.env.DB_DEV
const hostDB = process.env.HOST_DB
const dialectDB = 'postgres'

const APIResponse = class {
  constructor (success = true, data = {}) {
    this.success = success
    this.data = data
  }
}

module.exports = {
  pagination: {
    page: 1,
    records: 20
  },
  usernameDB,
  passwordDB,
  devDB,
  hostDB,
  dialectDB,
  jwtAccessKey,
  jwtRefreshKey,
  mongodbUri,
  port,
  emailHelper,
  passwordEmail,
  APIResponse
}
