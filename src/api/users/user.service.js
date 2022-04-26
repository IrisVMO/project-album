const User = require('./user.model')

const { Op } = require('sequelize')

const createUser = async (email, username, password) => {
  const user = User.create({ username, email, password })
  return user
}

const getOneUser = async (filter) => {
  const { email, username } = filter
  const user = await User.findOne({ where: {
    [Op.or]: [
      {email},
      username
    ]
  }})
  return user
}

const getAllUser = async (query) => {
  const { page, records, filter } = query
  const [totalRecords, users] = await Promise.all([User.count(),
  User.findAll({
    where: filter,
    offset: ((page - 1) * records),
    limit: records
  })
  ])

  return {
    users,
    totalRecords
  }
}

const updateInforService = async (email, username, userId) => {
  const user = await User.update({ where: userId }, { email, username })
  return user
}

const upPathfile = async (userId, link) => {
  const user = await User.update({ where: userId }, { linkImage: link })
  return user
}

const deleteUserService = async (id) => {
  const user = await User.destroy({ where: id })
  return user
}
module.exports = {
  createUser,
  getOneUser,
  getAllUser,
  updateInforService,
  upPathfile,
  deleteUserService
}
