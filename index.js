const express = require('express')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerOptions = require('./src/configs/swagger')
const { errorHandler } = require('./src/api/middlewares/errorhandler')
const { port } = require('./src/configs/config')

const dbConnect = require('./src/configs/postgres')
const swaggerDocs = swaggerJsDoc(swaggerOptions)
const app = express()

dbConnect
  .authenticate()
  .then(() => console.log('Postgres connect successfully'))
  .catch(err => console.log(`Error: ${err}`))

app.use(morgan('tiny'))
app.use(express.json({ limit: '50mb' }))
app.use(require('body-parser').json())
app.use(express.static('images'))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use('/api/users', require('./src/api/users/user.route'))
app.use('/api/albums', require('./src/api/albums/album.route'))
app.use('/api/photos', require('./src/api/photos/photo.route'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

module.exports = app
