const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { 
  createValidation,
  updateValidation,
  getAllAlbumValidate,
  getAlbum,
  deleteAlbumValidation
} = require('./user.validation')
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
routes.get('/:id', auth, validate(getAlbum), getAlbum)
routes.get('/', auth, validate(updateValidation), updateAlbum)
routes.patch('/:id', auth, validate(getAllAlbumValidate), getAllAlbum)
routes.delete('/:id', auth, validate(deleteAlbumValidation), deleteAlbum)

module.exports = routes