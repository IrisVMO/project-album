const Photo = require('./photo.model')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')

const create = async (name, description) => {
  const photo = await Photo.create({ name, description })
  return photo
}

const getOne = async (id) => {
  const photo = await Photo.findOne({ where: id })

  return photo
}

const getAll = async () => {
  const photo = await Photo.findAll()
  return photo
}

const updateOne = async (id, name, description, status) => {
  const photo = await Photo.update({ where: id }, { name, description, status })
  return photo
}

const deleteOne = async (id) => {
  const photo = await Photo.destroy({ where: id })
  return photo
}

module.exports = {
  create,
  getOne,
  getAll,
  updateOne,
  deleteOne
}