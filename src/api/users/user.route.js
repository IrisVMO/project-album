const express = require('express')
const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { authRefresh } = require('../middlewares/auth.refresh')
const { uploadSingle } = require('../middlewares/uploadFile')
const {
  sigupValidation,
  loginValidation,
  statusValidation,
  upAvaValidation,
  refreshTokenValidation,
  updateValidation
} = require('./user.validation')
const {
  signup,
  verifyAccount,
  login,
  refreshNewToken,
  getInf,
  getAll,
  setStatus,
  upAvatar,
  updateInfor,
  deleteOneUser
} = require('./user.controller')

const routes = express.Router()

routes.get('/infor', auth, getInf)

routes.get('/alluser', auth, getAll)

routes.get('/refreshtoken', authRefresh, validate(refreshTokenValidation), refreshNewToken)

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - User
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created user object
 *     responses:
 *       200:
 *         description: User Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 */

routes.post('/signup', validate(sigupValidation), signup)

routes.patch('/verify/:token', verifyAccount)

routes.post('/login', validate(loginValidation), login)

routes.patch('/status', auth, validate(statusValidation), setStatus)

routes.patch('/update', auth, validate(updateValidation), updateInfor)

routes.patch('/avatar', auth, validate(upAvaValidation), uploadSingle, upAvatar)

routes.delete('/delete', auth, deleteOneUser)

module.exports = routes
