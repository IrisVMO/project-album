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
 * /api/albums/{albumId}:
 *   get:
 *     summary: Get album
 *     tags:
 *       - Album
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Album id need to be get
 *        required: true
 *        type: uuid
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            albumname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created album object
 *     responses:
 *       200:
 *         description: album Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.get('/getone/:id', auth, validate(getOneValidation), getAlbum)

/**
 * @swagger
 * /api/albums/allalbum:
 *   get:
 *     summary: Get all album with role owner and contribue
 *     tags:
 *       - Album
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            albumname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created album object
 *     responses:
 *       200:
 *         description: album Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
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
 *      - name: id
 *        in: path
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
 * /api/albums/invite/{albumId}:
 *   patch:
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
 *        description: Invite another person to contribute the album
 *      - in: params
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *
 *     responses:
 *       200:
 *         description: album Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
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
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            albumname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created album object
 *     responses:
 *       200:
 *         description: album Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 */
routes.patch('/reply/:accessToken', validate(replyValidation), replyInviteContributeAlbum)

/**
 * @swagger
 * /api/albums/{albumId}:
 *   delete:
 *     summary: Delete a album
 *     tags:
 *       - Album
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            albumname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created album object
 *     responses:
 *       200:
 *         description: album Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.delete('/:id', auth, validate(deleteValidation), deleteAlbum)

module.exports = routes
