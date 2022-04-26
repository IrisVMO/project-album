const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
const APIError = require('../../configs/APIError')
const transporter = require('../Helpers/email')
const { APIResponse, emailHelper, pagination, jwtAccessKey, jwtRefreshKey } = require('../../configs/config')
const { createUser, getOneUser, getAllUser, updateInforService, upPathfile, deleteUserService } = require('./user.service')

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const passwordhash = await bcrypt.hash(password, await bcrypt.genSalt(10))

    const [emailIsExisted, usernameIsExisted] = await Promise.all([
      getOneUser({ email }),
      getOneUser({ username })
    ])

    if (emailIsExisted) {
      throw new APIError(StatusCodes.CONFLICT, 'Email already exists')
    }

    if (usernameIsExisted) {
      throw new APIError(StatusCodes.CONFLICT, 'Username already exists')
    }

    const user = await createUser(email, username, passwordhash)

    const options = {
      from: emailHelper,
      to: email,
      subject: 'Wellcom to project-base',
      text: 'Active email'
    }

    await transporter.sendMail(options)

    res.json(new APIResponse(true, { user }))
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body

    const user = await getOneUser({ email, username })

    if (!user) {
      throw new APIError(StatusCodes.BAD_REQUEST, 'Email or username wrong')
    }

    const result = bcrypt.compareSync(password, user.password)
    if (result) {
      const accessToken = jwt.sign({ _id: user.id }, jwtAccessKey, { expiresIn: '10days' })
      const refreshToken = jwt.sign({ _id: user.id }, jwtRefreshKey, { expiresIn: '10days' })

      res.json(new APIResponse(true, { message: 'Login is successfully', token: { accessToken, refreshToken } }))
    } else {
      throw new APIError(StatusCodes.BAD_REQUEST, 'username or password wrong')
    }
  } catch (error) {
    next(error)
  }
}

const refreshNewToken = (req, res, next) => {
  try {
    const user = req.user
    const accessToken = jwt.sign({ _id: user._id }, jwtAccessKey, { expiresIn: '10days' })
    const refreshToken = jwt.sign({ _id: user._id }, jwtRefreshKey, { expiresIn: '10days' })
    res.json(new APIResponse(true, { message: 'Refresh token is successfully', token: { accessToken, refreshToken } }))
  } catch (error) {
    next(error)
  }
}

const getInf = (req, res) => {
  res.json(new APIResponse(true, { infor: req.user }))
}

const getAll = async (req, res, next) => {
  try {
    const { page, ...filter } = req.query
    const query = {
      page: page || pagination.page,
      records: pagination.records,
      filter
    }

    const rs = await getAllUser(query)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const updateInfor = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const { email, username } = req.body

    const [emailIsExisted, usernameIsExisted] = await Promise.all([
      getOneUser({ email, username }),
      getOneUser({ email, username })
    ])
    if (emailIsExisted) {
      throw new APIError(StatusCodes.CONFLICT, 'Email already exists')
    }
    if (usernameIsExisted) {
      throw new APIError(StatusCodes.CONFLICT, 'Username already exists')
    }

    const rs = await updateInforService(email, username, userId)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const upAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const link = path.join('./images', req.file.originalname)

    const rs = await upPathfile(userId, link)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deleteOneUser = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const rs = await deleteUserService(userId)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  refreshNewToken,
  getInf,
  getAll,
  upAvatar,
  updateInfor,
  deleteOneUser
}
