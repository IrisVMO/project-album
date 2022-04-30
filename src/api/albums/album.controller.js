const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const APIError = require('../../configs/APIError')
const { APIResponse, pagination, port, jwtAccessKey, emailHelper } = require('../../configs/config')
const { transporter } = require('../Helpers/email')
const { getOneUser } = require('../users/user.service')
const {
  createAlbumService,
  inviteContributeAlbumService,
  replyInviteContributeAlbumService,
  getOneAlbumService,
  getAllAlbumService,
  updateOneAlbumService,
  deleteOneAlbumService
} = require('./album.service')

const createAlbum = async (req, res, next) => {
  try {
    const { name, description } = req.body
    const { id } = req.user

    const user = await getOneUser({ id })
    const album = await createAlbumService(name, description, user)

    res.json(new APIResponse(true, { album }))
  } catch (error) {
    next(error)
  }
}

const inviteContributeAlbum = async (req, res, next) => {
  try {
    const { userIdInvite: userId } = req.body
    const { id } = req.params
    const [user, album] = await Promise.all([
      getOneUser({ id: userId }),
      getOneAlbumService(id, req.user.id)
    ])
    console.log(user);
    // console.log(album);
    const { email } = user
    const rs = await inviteContributeAlbumService(user, album, id)

    const token = jwt.sign(userId, jwtAccessKey)
    const options = {
      from: emailHelper,
      to: email,
      subject: `Wellcom contribute to ${album.name}`,
      html: `<p>${user.usrename} invite you to ${album.name}
        <a href='http://localhost:${port}/api/albums/${token}?albumid=${album.id}&&status=Active'>Accept</a>
        || 
        <a href='http://localhost:${port}/api/albums/${token}?albumid=${album.id}&&status=Invalid'>Reject</a>
        </p>`
    }

    await transporter.sendMail(options)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}
const replyInviteContributeAlbum = async (req, res, next) => {
  try {
    const { accessToken } = req.params
    const { status, albumid: albumId } = req.query
    const decode = jwt.verify(accessToken, jwtAccessKey)
    const userId = decode._id
    const user = await getOneUser({ id: decode._id })
    if (!user) {
      throw new APIError(StatusCodes.UNAUTHORIZED, 'Don\'t have permission')
    }

    const rs = await replyInviteContributeAlbumService(userId, albumId, status)

    res.json(new APIResponse(true, { message: 'Acepted', rs }))
  } catch (error) {
    next(error)
  }
}

const getAlbum = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { id } = req.params

    const album = await getOneAlbumService(id, userId)
    res.json(new APIResponse(true, { album }))
  } catch (error) {
    next(error)
  }
}

const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description, status } = req.body

    const rs = await updateOneAlbumService(id, name, description, status)
    res.json(new APIResponse(true, {message:'Update album successfully', rs}))
  } catch (error) {
    next(error)
  }
}

const getAllAlbum = async (req, res, next) => {
  try {
    const { id: userId } = req.user
    const { page, ...filter } = req.query
    const query = {
      page: page || pagination.page,
      records: pagination.records,
      filter
    }

    const rs = await getAllAlbumService(query, userId)

    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user

    const rs = await deleteOneAlbumService(id, userId)
    res.json(new APIResponse(true, rs))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAlbum,
  getAlbum,
  updateAlbum,
  getAllAlbum,
  inviteContributeAlbum,
  replyInviteContributeAlbum,
  deleteAlbum,
}