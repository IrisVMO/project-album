const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
const APIError = require('../../configs/APIError')
const transporter = require('../Helpers/email')
const {
  APIResponse,
  emailHelper,
  pagination,
  jwtAccessKey,
  jwtRefreshKey
} = require('../../configs/config')
const {
  createUser,
  getOneUser,
  getAllUser,
  setStatusService,
  updateInforService,
  upPathfile,
  deleteUserService
} = require('./user.service')

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(10))

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

    const user = await createUser(email, username, passwordHash)

    const token = jwt.sign({ _id: user.id }, jwtAccessKey)

    const options = {
      from: emailHelper,
      to: email,
      subject: 'Wellcom to UNIVERSE PHOTOS',
      html:
        `<p>
          Please verify your account
          <a href='http://${host}:${port}/api/users/verify/${token}>Verify Account</a>
        </p>`
    }

    await updateInforService({ token, id: user.id })
    await transporter.sendMail(options)

    res.json(new APIResponse(true, { message: 'Please check mail to verify', user }))
  } catch (error) {
    next(error)
  }
}
const verifyAccount = async (req, res, next) => {
  try {
    const { token } = req.param

    const decode = jwt.verify(token, jwtAccessKey)
    const rs = await updateInfor({ id: decode.id })

    if (rs[0] === 0) {
      throw new APIError(StatusCodes.BAD_GATEWAY, 'Verify your account fail')
    }
    res.json(new APIResponse(true, rs))
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
    if (user.token) {
      throw new APIError(
        StatusCodes.BAD_REQUEST,
        `Please verify account in your email ${user.email}`
      )
    }

    const result = bcrypt.compareSync(password, user.password)

    if (result) {
      const accessToken = jwt.sign({ _id: user.id }, jwtAccessKey, { expiresIn: '10days' })
      const refreshToken = jwt.sign({ _id: user.id }, jwtRefreshKey, { expiresIn: '10days' })
      res.json(new APIResponse(true, {
        message: 'Login is successfully',
        token: { accessToken, refreshToken }
      }))
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
      recordsAPage: pagination.recordsAPage,
      filter
    }

    const rs = await getAllUser(query)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const setStatus = async (req, res, next) => {
  try {
    const { id } = req.user
    const { status } = req.body

    const rs = await setStatusService(id, status)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}
const updateInfor = async (req, res, next) => {
  try {
    const { id } = req.user
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

    const rs = await updateInforService({ email, username, id })
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const upAvatar = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const link = path.join('./images', req.file.originalname)

    const rs = await upPathfile(userId, link)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deleteOneUser = async (req, res, next) => {
  try {
    const { id } = req.user
    const rs = await deleteUserService(id)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  verifyAccount,
  login,
  refreshNewToken,
  getInf,
  getAll,
  setStatus,
  upAvatar,
  updateInfor,
  deleteOneUser
}
