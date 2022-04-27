const { StatusCodes } = require('http-status-codes')
const APIError = require('../../configs/APIError')
const { APIResponse, pagination } = require('../../configs/config')
const { create, getOne, getAll, updateOne, deleteOne } = require('./photo.service')

const createPhoto = async (req, res, next) => {
  try {
    const { name, description } = req.body

    const rs = await create(name, description)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const getPhoto = async (req, res, next) => {
  try {
    const { id } = req.params
    const rs = await getOne({ id })
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, status } = req.body
    const rs = await updateOne(id, name, description, status)
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

    const rs = await getAll(query)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deletePhoto = async (req, res, next) => {
  try {
    const id = req.params
    const rs = await deleteOne(id)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPhoto,
  getPhoto,
  updatePhoto,
  getAllPhoto,
  deletePhoto,
}