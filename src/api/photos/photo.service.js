const { Photo } = require('./photo.model')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
// const { getOneUserAlbumService } = require('../useralbums/useralbum.service')

const addToAlbumService = async (name, link, userId, albumId) => {
  // const useralbum = await getOneUserAlbumService({ userId })
  // if (!useralbum) {
  //   throw new APIError(StatusCodes.BAD_REQUEST, 'Invalid album')
  // }
  // const { status } = useralbum
  // if (status === 'Inactive') {
  //   throw new APIError(StatusCodes.FORBIDDEN, 'Do not have permission add photo to album')
  // }
  const photo = await Photo.create({ name, link, userId, albumId })
  return photo
}

const getAllPhotoService = async () => {
  const photo = await Photo.findAll()
  return photo
}

const updateOnePhotoService = async (id, status) => {
  const photo = await Photo.update({ where: id }, { status })
  return photo
}

const deleteOnePhotoService = async (id) => {
  const photo = await Photo.destroy({ where: id })
  return photo
}

module.exports = {
  addToAlbumService,
  getAllPhotoService,
  updateOnePhotoService,
  deleteOnePhotoService
}