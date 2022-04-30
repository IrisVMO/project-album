const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { 
  createValidation,
  updateValidation,
  getOneValidation,
  getAllValidation,
  inviteContributeValidation,
  deleteValidation
} = require('./album.validation')
const {
  createAlbum,
  inviteContributeAlbum,
  replyInviteContributeAlbum,
  getAlbum,
  updateAlbum,
  getAllAlbum,
  deleteAlbum,
} = require('./album.controller')
const express = require('express')
const routes = express.Router()

routes.post('/', auth, validate(createValidation), createAlbum)
routes.post('/invite/:id', auth, validate(inviteContributeValidation), inviteContributeAlbum)
routes.patch('/reply/:accessToken', replyInviteContributeAlbum)
routes.get('/:id', auth, getAlbum)
routes.get('/', auth, getAllAlbum)
routes.patch('/:id', auth, updateAlbum)
routes.delete('/:id', auth, validate(deleteValidation), deleteAlbum)

module.exports = routes