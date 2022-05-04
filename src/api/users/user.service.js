const { User } = require('./user.model')
const { Op } = require('sequelize')

const createUser = async (email, username, password) => {
  const user = User.create({ username, email, password })
  return user
}

const getOneUser = async (filter) => {
  let { email, username, id } = filter

  if (!email) {
    email = ''
  }
  if (!username) {
    username = ''
  }
  if (!id) {
    const user = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    })

    return user
  }

  const user = await User.findByPk(id)

  return user
}

const getAllUser = async (query) => {
  const { page, recordsAPage, filter } = query
  const [totalRecords, users] = await Promise.all([
    User.count(),
    User.findAll({
      where: filter,
      offset: ((page - 1) * recordsAPage),
      limit: recordsAPage
    })
  ])

  return {
    users,
    totalRecords
  }
}

const setStatusService = async (id, status) => {
  const rs = await User.update({ status }, { where: { id } })
  return rs
}

const updateInforService = async (filter) => {
  const { username, email, token, id } = filter

  const rs = await User.update({ email, username, token }, { where: { id } })
  return rs
}

const upPathfile = async (userId, link) => {
  const rs = await User.update({ linkImage: link }, { where: userId })
  return rs
}

const deleteUserService = async (id) => {
  const rs = await User.destroy({ where: { id } })
  return rs
}

module.exports = {
  createUser,
  getOneUser,
  getAllUser,
  setStatusService,
  updateInforService,
  upPathfile,
  deleteUserService
}
