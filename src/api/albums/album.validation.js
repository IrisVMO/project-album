const { Joi } = require('express-validation')

const createValidation = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required()
  })
}

const updateValidation = {
  params: Joi.object({
    id: Joi.string()
      .required
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
  })
}

const getOneValidation = {
  params: Joi.object({
    albumId: Joi.string()
      .required
  })
}

const getAllValidation = {
  params: Joi.object({
    id: Joi.string()
      .required
  }),
  query: Joi.object({
    page: Joi.number(),
    filter: Joi.string()
  })
}

const deleteValidation = {
  params: Joi.object({
    albumId: Joi.string()
      .required
  })
}

module.exports = {
  createValidation,
  updateValidation,
  getOneValidation,
  getAllValidation,
  deleteValidation
}
