const express = require('express')
const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const {
  createValidation,
  updateValidation,
  getOneValidation,
  inviteContributeValidation,
  replyValidation,
  deleteValidation
} = require('./album.validation')
const {
  createAlbum,
  inviteContributeAlbum,
  replyInviteContributeAlbum,
  getAlbum,
  updateAlbum,
  getAllAlbum,
  deleteAlbum
} = require('./album.controller')

const routes = express.Router()

/**
 * @swagger
 * securityDefinitions:
 *   accessToken:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 */

/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Create new albums
 *     tags:
 *       - Album
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *        description: Created album object
 *     responses:
 *       200:
 *         description: Album Added Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.post('/', auth, validate(createValidation), createAlbum)

/**
 * @swagger
 * /api/albums/getone/{id}:
 *   get:
 *     summary: Get album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Album id need to be get
 *        required: true
 *        type: string
 *        format: uuid
 *     responses:
 *       200:
 *         description: ALbum get Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.get('/getone/:id', auth, validate(getOneValidation), getAlbum)

/**
 * @swagger
 * /api/albums/getall:
 *   get:
 *     summary: Get all album with role owner and contribue
 *     tags:
 *       - Album
 *     parameters:
 *     - in: query
 *       name: page
 *       type: number
 *     - in: query
 *       name: filter
 *       type: string
 *     responses:
 *       200:
 *         description: Get all album Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.get('/getall', auth, getAllAlbum)

/**
 * @swagger
 * /api/albums/{id}:
 *   patch:
 *     summary: Update fields album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Album id need to be update
 *        required: true
 *        type: string
 *        format: uuid
 *      - in: body
 *        name: body
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            description:
 *              type: string
 *            status:
 *              type: string
 *              enum:
 *                - Public
 *                - Private
 *        description: Update album object
 *     responses:
 *       200:
 *         description: Album update Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.patch('/:id', auth, validate(updateValidation), updateAlbum)

/**
 * @swagger
 * /api/albums/invite/{id}:
 *   post:
 *     summary: Invite another person to contribute the album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            userIdInvite:
 *              type: string
 *              format: uuid
 *        description: Invite another person to contribute the album
 *      - in: path
 *        name: id
 *        type: string
 *        format: uuid
 *        description: Album id to invite another person
 *
 *     responses:
 *       200:
 *         description: Invite another persion Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.post('/invite/:id', auth, validate(inviteContributeValidation), inviteContributeAlbum)

/**
 * @swagger
 * /api/albums/reply/{accessToken}:
 *   patch:
 *     summary: respond to invitation to contribute album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: query
 *        name: status
 *        required: true
 *        type: string
 *        enum:
 *          - Active
 *          - Inactive
 *      - in: query
 *        name: albumid
 *        required: true
 *        type: string
 *        format: uuid
 *      - in: path
 *        name: accessToken
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Reply Successfully.
 *       400:
 *         description: Bad Request
 */
routes.patch('/reply/:accessToken', validate(replyValidation), replyInviteContributeAlbum)

/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Delete a album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        format: uuid
 *        description: Album id to delete
 *     responses:
 *       200:
 *         description: Delete Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.delete('/:id', auth, validate(deleteValidation), deleteAlbum)

module.exports = routes
