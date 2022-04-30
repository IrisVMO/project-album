const path = require('path')
const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const { APIResponse, pagination } = require('../../configs/config')
const { addToAlbumService, getAllPhotoService, updateOnePhotoService, deleteOnePhotoService } = require('./photo.service')

const addPhoto = async (req, res, next) => {
  try {
    const { albumId } = req.params
    const { id: userId } = req.user
    const name = req.file.originalname
    const link = path.join('./images', name)

    const rs = await addToAlbumService(name, link, userId, albumId)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, status } = req.body
    const rs = await updateOnePhotoService(id, name, description, status)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const getAllPhoto = async (req, res, next) => {
  try {
    const { page, ...filter } = req.query
    const query = {
      page: page || pagination.page,
      records: pagination.records,
      filter
    }

    const rs = await getAllPhotoService(query)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deletePhoto = async (req, res, next) => {
  try {
    const id = req.params
    const rs = await deleteOnePhotoService(id)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addPhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto,
}