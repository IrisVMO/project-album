const Photo = require('./album.model')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const {
  getAllUserPhoto,
  getOneUserPhoto
} = require('../userPhoto/userphoto.service')

const create = async (name, description) => {
  const Photo = await Photo.create({ name, description })
}

const getOne = async (Photoid) => {
  const photo = await Photo.findOne({ where: Photoid })
  if (!photo) {
    throw new APIError(StatusCodes.BAD_REQUEST, 'Invalid Photo')
  }

  const userPhoto = await getOneUserPhoto(Photoid)

  const role = userPhoto.role
  if (!role.include('owner') || !role.include('contribute')) {
    throw new APIError(StatusCodes.BAD_REQUEST, 'Do not have permission open Photo')
  }

  return Photo
}

const getAll = async () => {
  const Photo = await Photo.findAll()
  return Photo
}

const updateOne = async (id, name, description, status) => {
  const Photo = await Photo.update({ where: id }, { name, description, status })
  return Photo
}

const deleteOne = async (id) => {
  const Photo = await Photo.destroy({ where: id })
  return Photo
}

module.exports = {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne
}