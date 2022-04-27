const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { 
  createValidation,
  updateValidation,
  getOneValidation,
  getAllValidation,
  deleteValidation
} = require('./album.validation')
const {
  createAlbum,
  getAlbum,
  updateAlbum,
  getAllAlbum,
  deleteAlbum,
} = require('./album.controller')
const express = require('express')
const routes = express.Router()

routes.post('/', auth, validate(createValidation), createAlbum)
routes.get('/:id', auth, validate(getOneValidation), getAlbum)
routes.get('/:id', auth, validate(getAllValidation), getAllAlbum)
routes.patch('/:id', auth, validate(updateValidation), updateAlbum)
routes.delete('/:id', auth, validate(deleteValidation), deleteAlbum)

module.exports = routes