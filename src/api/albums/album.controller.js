const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const { APIResponse, pagination } = require('../../configs/config')
const { create, getOne, getAll, updateOne, deleteOne } = require('./album.service')

const createAlbum = async (req, res, next) => {
  try {
    const { name, description } = req.body

    const rs = await create(name, description)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const getAlbum = async (req, res, next) => {
  try {
    const albumId = req.params
    const rs = await getOne({ albumId })
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, status } = req.body
    const rs = await updateOne(id, name, description, status)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const getAllAlbum = async (req, res, next) => {
  try {
    const { page, ...filter } = req.query
    const query = {
      page: page || pagination.page,
      records: pagination.records,
      filter
    }

    const rs = await getAll(query)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const id = req.params
    const rs = await deleteOne(id)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAlbum,
  getAlbum,
  updateAlbum,
  getAllAlbum,
  deleteAlbum,
}