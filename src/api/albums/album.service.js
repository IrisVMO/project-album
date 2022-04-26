const Album = require('./album.model')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const {
  getAllUserAlbum,
  getOneUserAlbum
} = require('../useralbum/useralbum.service')

const create = async (name, description) => {
  const album = await Album.create({ name, description })
}

const getOne = async (albumid) => {
  const album = await Album.findOne({ where: albumid })
  if (!album) {
    throw new APIError(StatusCodes.BAD_REQUEST, 'Invalid album')
  }

  const userAlbum = await getOneUserAlbum(albumid)

  const role = userAlbum.role
  if (!role.include('owner') || !role.include('contribute')) {
    throw new APIError(StatusCodes.BAD_REQUEST, 'Do not have permission open album')
  }

  return album
}

const getAll = async () => {
  const album = await Album.findAll()
  return album
}

const updateOne = async (id, name, description, status) => {
  const album = await Album.update({ where: id }, { name, description, status })
  return album
}

const deleteOne = async (id) => {
  const album = await Album.destroy({ where: id })
  return album
}

module.exports = {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne
}