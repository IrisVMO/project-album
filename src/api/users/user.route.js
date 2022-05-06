const express = require('express')
const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { uploadSingle } = require('../middlewares/uploadFile')
const {
  sigupValidation,
  loginValidation,
  statusValidation,
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

/**
 * @swagger
 * securityDefinitions:
 *   accessToken:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 *   refreshToken:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 */

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

/**
 * @swagger
 * /api/users/verify/{tokenVerify}:
 *   get:
 *     summary: Verify account
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *        name: tokenVerify
 *        required: true
 *        type: string
 *        description: Token to verify account
 *     responses:
 *       200:
 *         description: Verify account uccessfully.
 *       400:
 *         description: Bad Request
 */
routes.get('/verify/:tokenVerify', verifyAccount)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
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
 *         description: Login successfully.
 *       400:
 *         description: Bad Request
 */
routes.post('/login', validate(loginValidation), login)

/**
 * @swagger
 * /api/users/infor:
 *   get:
 *     summary: Get user information
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *     responses:
 *       200:
 *         description: Get infor successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.get('/infor', auth, getInf)

/**
 * @swagger
 * /api/users/alluser:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     parameters:
 *      - in: query
 *        name: filter
 *        type: string
 *      - in: query
 *        name: page
 *        type: number
 *     responses:
 *       200:
 *         description: Get all users successfully
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.get('/alluser', auth, getAll)

/**
 * @swagger
 * /api/users/refreshtoken:
 *   get:
 *     summary: Refresh token
 *     tags:
 *       - User
 *     parameters:
 *      - in: query
 *        name: refreshToken
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Refresh token successfully
 *       400:
 *         description: Bad Request
 *     security:
 *     - refreshToken: []
 */
routes.get('/refreshtoken', validate(refreshTokenValidation), refreshNewToken)

/**
 * @swagger
 * /api/users/status:
 *   patch:
 *     summary: Update status active account
 *     tags:
 *       - User
 *     parameters:
 *      - in: body
 *        name: status
 *        required: true
 *        type: string
 *        enum:
 *          - Available
 *          - Busy
 *          - Offline
 *        description: Status to update
 *     responses:
 *       200:
 *         description: Update status successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */

routes.patch('/status', auth, validate(statusValidation), setStatus)

/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Update user
 *     tags:
 *       - User
 *     parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *        description: Update user object
 *     responses:
 *       200:
 *         description: User update successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.patch('/update', auth, validate(updateValidation), updateInfor)

/**
 * @swagger
 * /api/users/avatar:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update avatar
 *     operationId: uploadFile
 *     Content-Type:
 *     - multipart/form-data; boundary=MyBoundary
 *     produces:
 *     - application/json
 *     parameters:
 *      - in: formData
 *        name: image
 *        description: file to upload
 *        required: true
 *        type: file
 *     responses:
 *       200:
 *         description: Update avatar Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.patch('/avatar', auth, uploadSingle, upAvatar)

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - User
 *     parameters:
 *      - in: body
 *     responses:
 *       200:
 *         description: Delete user successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.delete('/delete', auth, deleteOneUser)

module.exports = routes
