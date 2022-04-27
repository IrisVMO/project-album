const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { createValidation, updateValidation } = require('./photo.validation')
const {
  createPhoto,
  getPhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto,
} = require('./photo.controller')
const express = require('express')
const routes = express.Router()

routes.post('/', auth, validate(createValidation), createPhoto)
routes.get('/:id', auth, getPhoto)
routes.get('/', auth, validate(updateValidation), updatePhoto)
routes.patch('/:id', auth, getAllPhoto)
routes.delete('/:id', auth, deletePhoto)

module.exports = routes