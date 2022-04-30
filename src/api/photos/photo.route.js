const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { uploadSingle } = require('../middlewares/uploadFile')
const {
  createValidation,
  updateValidation,
  getAllValidation,
  deleteValidation
} = require('./photo.validation')
const {
  addPhoto,
  movePhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto,
} = require('./photo.controller')
const express = require('express')
const routes = express.Router()

routes.post('/:albumId', auth, uploadSingle, addPhoto)
routes.patch('/move', auth, movePhoto)
routes.patch('/', auth, validate(updateValidation), updatePhoto)
routes.get('/', auth, validate(getAllValidation), getAllPhoto)
routes.delete('/:id', auth, validate(deleteValidation), deletePhoto)

module.exports = routes
