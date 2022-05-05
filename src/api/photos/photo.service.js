const { Photo } = require('./photo.model')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const { AlbumUser } = require('../users/user.model')

const addToAlbumService = async (name, link, userId, albumId) => {
  const albumUser = await AlbumUser.findOne({ where: { userId, albumId } })
  if (!albumUser) {
    throw new APIError(StatusCodes.NOT_FOUND, 'Not found the album to add photo')
  }
  const { status } = albumUser
  if (status !== 'Active') {
    throw new APIError(
      StatusCodes.FORBIDDEN,
      'Please respond to the invitation to contribute album')
  }

  const photo = await Photo.create({ name, link, userId, albumId })
  return photo
}

const movePhotoService = async (id, albumId) => {
  const photo = await Photo.update({ albumId }, { where: { id } })
  return photo
}

const getPhotoService = async (id) => {
  const photo = await Photo.findByPk(id)
  return photo
}

const getAllPhotoService = async (query, filter) => {
  const { page, recordsAPage } = query
  const [totalRecords, photos] = await Promise.all([
    Photo.count(),
    Photo.findAll({
      where: filter,
      offset: ((page - 1) * recordsAPage),
      limit: recordsAPage
    })
  ])

  return {
    photos,
    totalRecords
  }
}

const updateOnePhotoService = async (id, filter) => {
  const { name, status, albumId } = filter
  const photo = await Photo.update({ status, name, albumId }, { where: { id } })
  return photo
}

const deleteOnePhotoService = async (id) => {
  const photo = await Photo.destroy({ where: id })
  return photo
}

module.exports = {
  addToAlbumService,
  getPhotoService,
  movePhotoService,
  getAllPhotoService,
  updateOnePhotoService,
  deleteOnePhotoService
}
