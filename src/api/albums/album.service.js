const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const { Album } = require('./album.model')
const { User, AlbumUser } = require('../users/user.model')

const createAlbumService = async (name, description, user) => {
  const album = await Album.create({ name, description })

  await user.addAlbum(album, { through: { role: 'Owner' } })
  return album
}

const inviteContributeAlbumService = async (user, album) => {
  const rs = await user.addAlbum(album, { through: { role: 'Contribute', status: 'Inactive' } })
  if (!rs) {
    throw new APIError(StatusCodes.BAD_REQUEST, 'Invited this user')
  }
  return rs
}

const replyInviteContributeAlbumService = async (userId, albumId, status) => {
  const rs = await AlbumUser.update({ status }, { where: { albumId, userId } })
  return rs
}

const getOneAlbumService = async (id, userId) => {
  const album = await Album.findOne({ where: { id }, include: ['photos', 'users'] })
  if (!album) {
    throw new APIError(StatusCodes.NOT_FOUND, 'Not found the album')
  }

  const { status } = album

  if (status.toString() === 'Private') {
    const albumUser = await AlbumUser.findOne({ where: { userId, albumId: id } })

    if (!albumUser) {
      throw new APIError(StatusCodes.FORBIDDEN, 'Do not have permission open album')
    }

    const { status } = albumUser

    if (status === 'Inactive') {
      throw new APIError(StatusCodes.FORBIDDEN, 'Do not have permission open album')
    }
  }

  return album
}

const getAllAlbumService = async (query, userId) => {
  // const { page, records, filter } = query
  const user = await User.findOne({
    include: 'albums',
    where: { id: userId }
  })

  const { albums } = user

  const rs = albums.filter(listAlbum => listAlbum.album_user.status === 'Active')
  return rs
}

const updateOneAlbumService = async (id, name, description, status) => {
  const album = await Album.update({ name, description, status }, { where: { id } })
  return album
}

const deleteOneAlbumService = async (albumId, userId) => {
  const albumUser = await AlbumUser.findOne({ where: { albumId, userId } })
  if (!albumUser) {
    throw new APIError(StatusCodes.NOT_FOUND, 'Not found the album to delete')
  }

  const { role } = albumUser
  if (role !== 'Owner') {
    throw new APIError(StatusCodes.FORBIDDEN, 'Don\'t have permission to delete album')
  }

  const rs = await Album.destroy({ where: { id: albumId } })
  return rs
}

module.exports = {
  createAlbumService,
  inviteContributeAlbumService,
  replyInviteContributeAlbumService,
  getOneAlbumService,
  getAllAlbumService,
  updateOneAlbumService,
  deleteOneAlbumService
}
