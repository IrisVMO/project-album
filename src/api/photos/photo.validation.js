const { Joi } = require('express-validation')

const createValidation = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    albumId: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required(),
    userId: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  })
}

const updateValidation = {
  params: Joi.object({
    id: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required()
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
  })
}

const getAllValidation = {
  query: Joi.object({
    page: Joi.number(),
    filter: Joi.string()
  })
}

const deleteValidation = {
  params: Joi.object({
    albumId: Joi.string()
      .guid({
        version: [
          'uuidv4'
        ]
      })
      .required
  })
}

module.exports = {
  createValidation,
  updateValidation,
  getAllValidation,
  deleteValidation
}
