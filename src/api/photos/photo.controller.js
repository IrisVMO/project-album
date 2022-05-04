const path = require('path')
const { APIResponse, pagination } = require('../../configs/config')
const {
  addToAlbumService,
  getPhotoService,
  getAllPhotoService,
  updateOnePhotoService,
  deleteOnePhotoService
} = require('./photo.service')

const addPhoto = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { name, albumId } = req.body
    const link = path.join('./images', req.file.originalname)

    const rs = await addToAlbumService(name, link, userId, albumId)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const getPhoto = async (req, res, next) => {
  try {
    const { id } = req.params

    const rs = await getPhotoService(id)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const movePhoto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { albumId } = req.body

    const rs = await updateOnePhotoService(id, { albumId })

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, status } = req.body

    const rs = await updateOnePhotoService(id, { name, status })
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

    const rs = await getAllPhotoService(query, filter)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deletePhoto = async (req, res, next) => {
  try {
    const id = req.params
    const rs = await deleteOnePhotoService(id)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addPhoto,
  getPhoto,
  movePhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto
}
