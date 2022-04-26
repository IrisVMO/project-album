const nodemailer = require('nodemailer')
const { emailHelper, passwordEmail } = require('../../configs/config')

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: emailHelper,
    pass: passwordEmail
  }
})

module.exports = transporter
