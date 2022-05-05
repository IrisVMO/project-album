const express = require('express')
const { validate } = require('express-validation')
const { auth, authRefresh } = require('../middlewares/auth')
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
 * /api/users/verify:
 *   patch:
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
routes.patch('/verify/:tokenVerify', verifyAccount)

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
 *         description: User Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
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
 *     security:
 *     - accessToken: []
 */
routes.get('/infor', auth, getInf)

/**
 * @swagger
 * /api/users/alluser:
 *   get:
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
 *     security:
 *     - accessToken: []
 */
routes.get('/alluser', auth, getAll)

/**
 * @swagger
 * /api/users/refreshtoken:
 *   get:
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
 *     security:
 *     - refreshToken: []
 */
routes.get('/refreshtoken', authRefresh, validate(refreshTokenValidation), refreshNewToken)

/**
 * @swagger
 * /api/users/status:
 *   patch:
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
 *     security:
 *     - accessToken: []
 */

routes.patch('/status', auth, validate(statusValidation), setStatus)

/**
 * @swagger
 * /api/users/update:
 *   patch:
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
 *     security:
 *     - accessToken: []
 */
routes.patch('/update', auth, validate(updateValidation), updateInfor)

/**
 * @swagger
 * /api/users/avatar:
 *   patch:
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
 *     security:
 *     - accessToken: []
 */
routes.patch('/avatar', auth, uploadSingle, upAvatar)

/**
 * @swagger
 * /api/users/delete:
 *   delete:
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
 *     security:
 *     - accessToken: []
 */
routes.delete('/delete', auth, deleteOneUser)

module.exports = routes
