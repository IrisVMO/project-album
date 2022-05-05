const express = require('express')
const { validate } = require('express-validation')
const { auth } = require('../middlewares/auth')
const { uploadSingle } = require('../middlewares/uploadFile')
const {
  // createValidation,
  // updateValidation,
  getAllValidation,
  deleteValidation
} = require('./photo.validation')
const {
  addPhoto,
  getPhoto,
  movePhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto
} = require('./photo.controller')

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
 * /api/photos:
 *   post:
 *     tags:
 *       - Photo
 *     summary: uploads an image
 *     operationId: uploadFile
 *     Content-Type:
 *     - multipart/form-data; boundary=MyBoundary
 *     produces:
 *     - application/json
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        type: string
 *      - in: formData
 *        name: albumId
 *        required: true
 *        type: string
 *        format: uuid
 *      - in: formData
 *        name: image
 *        description: file to upload
 *        required: true
 *        type: file
 *     description: Created photo object
 *     responses:
 *       200:
 *         description: Photo Added Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.post('/', auth, uploadSingle, addPhoto)

/**
 * @swagger
 * /api/photos/getone/{id}:
 *   get:
 *     summary: Get one photo
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: path
 *        name: albumid
 *        required: true
 *        type: string
 *        format: uuid
 *        description: Album id to delete
 *     responses:
 *       200:
 *         description: Photo Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.get('/getone/:id', auth, getPhoto)
/**
 * @swagger
 * /api/photos/getall:
 *   get:
 *     summary: Get all photos
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: query
 *        name: page
 *        type: number
 *      - in: query
 *        name: filter
 *        type: string
 *     responses:
 *       200:
 *         description: Get all photos Successfully.
 *       400:
 *         description: Bad Request
 *     security:
 *     - accessToken: []
 */
routes.get('/getall', auth, validate(getAllValidation), getAllPhoto)

/**
 * @swagger
 * /api/photos/move/{photoId}:
 *   patch:
 *     summary: Move photo from this album to another album
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            photoname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created photo object
 *     responses:
 *       200:
 *         description: photo Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.patch('/move/:id', auth, movePhoto)

/**
 * @swagger
 * /api/photos/{photoId}:
 *   patch:
 *     summary: Update field photo
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            photoname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created photo object
 *     responses:
 *       200:
 *         description: photo Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.patch('/:id', auth, updatePhoto)

/**
 * @swagger
 * /api/photos/{photoId}:
 *   delete:
 *     summary: Delete a photo
 *     tags:
 *       - Photo
 *     parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            photoname:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *        description: Created photo object
 *     responses:
 *       200:
 *         description: photo Added Successfully.
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict
 *     security:
 *     - accessToken: []
 */
routes.delete('/:id', auth, validate(deleteValidation), deletePhoto)

module.exports = routes
