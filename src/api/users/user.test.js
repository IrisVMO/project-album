const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../index')
// const User = require('./user.model')
const expect = chai.expect
const { it, describe } = require('mocha')

const testData = {
  user: {
    username: 'naaasm3333',
    password: 'naaaasaam0123',
    email: 'nam33aas23@gmail.com',
    passwordmin: 123,
    emailErr: 'abcs.com',
    status: {
      Available: 'Available',
      Busy: 'Busy',
      Offline: 'Offline'
    },
    link: 'imgtest/img1.jpg'
  },
  userUpdate: {
    username: 'nam1234',
    password: 'naaaaam0123',
    email: 'nam1234@gmail.com'
  }
}

let accessToken, refreshToken, tokenVerify

chai.use(chaiHttp)

describe('POST /api/users/signup', () => {
  it('Return status 200 and new user', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        email: testData.user.email,
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        tokenVerify = res.body.data.tokenVerify
        done()
      })
  })

  it('Return 400 bad request when password length less than 6', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        email: testData.user.email,
        username: testData.user.username,
        password: testData.user.passwordmin
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
  it('Return 400 bad request when email format is incorrect', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        email: testData.user.emailErr,
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 400 bad request when email or username null', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        email: testData.user.emailErr,
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 409 error when email is already registered', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        email: testData.user.email,
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(409)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('POST /api/users/login', () => {
  it('Return 400 error when haven\'t verified the account yet', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('GET /api/users/verify/:token', () => {
  it('Return 200 and user verify account successfully', (done) => {
    chai
      .request(app)
      .get(`/api/users/verify/${tokenVerify}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('Return 400 error when verify account failed', (done) => {
    chai
      .request(app)
      .get(`/api/users/verify/${'random'}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 400 error when validation params failed', (done) => {
    chai
      .request(app)
      .get(`/api/users/verify/${1}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('POST /api/users/login', () => {
  it('Return 200 OK and accessToken, refreshToken', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        password: testData.user.password
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        expect(res.body.data).to.have.property('token')
        accessToken = res.body.data.token.accessToken
        refreshToken = res.body.data.token.refreshToken
        done()
      })
  })

  it('Return 400 error when validation failed', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: 23123,
        password: ''
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 400 error when username or password wrong', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: testData.user.username,
        password: testData.user.password + 'haha'
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('GET /api/users/infor', () => {
  it('Return 200 and user infor', (done) => {
    chai
      .request(app)
      .get('/api/users/infor')
      .set({ Authorization: accessToken })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        expect(res.body.data).to.have.property('infor')
        expect(res.body.data.infor).to.have.property('username')
        expect(res.body.data.infor).to.have.property('email')
        expect(res.body.data.infor.username).to.equal(testData.user.username)
        expect(res.body.data.infor.email).to.equal(testData.user.email)
        done()
      })
  })

  it('Return 400 error when accessToken is not valid', (done) => {
    chai
      .request(app)
      .get('/api/users/infor')
      .set({ Authorization: 'random' })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('GET /api/users/alluser', () => {
  it('Return 200 and all user', (done) => {
    chai
      .request(app)
      .get('/api/users/alluser')
      .set({ Authorization: accessToken })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })
  it('Return 400 error when accessToken is not valid', (done) => {
    chai
      .request(app)
      .get('/api/users/alluser')
      .set({ Authorization: 'random' })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('GET /api/users/refreshToken', () => {
  it('Return 200 OK and refresh token, access token', (done) => {
    chai
      .request(app)
      .get(`/api/users/refreshToken?refreshToken=${refreshToken}`)
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('Return 400 bad request when refreshToken is not valid', (done) => {
    chai
      .request(app)
      .get(`/api/users/refreshToken?refreshToken=${'random' + refreshToken}`)
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('PATCH /api/users/status', () => {
  it('Return 200 OK', (done) => {
    chai
      .request(app)
      .patch('/api/users/status')
      .set({ Authorization: accessToken })
      .send({ status: testData.user.status.Busy })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('Return 400 bad request when accessToken is not valid', (done) => {
    chai
      .request(app)
      .patch('/api/users/status')
      .set({ Authorization: 'random' })
      .send({ status: testData.user.status.Busy })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 400 bad request when validation failed', (done) => {
    chai
      .request(app)
      .patch('/api/users/status')
      .set({ Authorization: accessToken })
      .send({ status: '' })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('PATCH /api/users/update', () => {
  it('Return 200 OK and update user', (done) => {
    chai
      .request(app)
      .patch('/api/users/update')
      .set({ Authorization: accessToken })
      .send({
        username: testData.userUpdate.username,
        email: testData.userUpdate.email
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('Return 400 error when accessToken is not valid', (done) => {
    chai
      .request(app)
      .patch('/api/users/update')
      .set({ Authorization: 'random' })
      .send({
        username: testData.userUpdate.username,
        email: testData.userUpdate.email
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('Return 400 error when validation failed', (done) => {
    chai
      .request(app)
      .patch('/api/users/update')
      .set({ Authorization: accessToken })
      .send({
        username: 232,
        email: 322
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('PATCH /api/users/avatar', () => {
  it('Return 200 OK', (done) => {
    chai
      .request(app)
      .patch('/api/users/avatar')
      .set({ Authorization: accessToken })
      .attach('image', testData.user.link)
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('Return 400 Bad request invalid token', (done) => {
    chai
      .request(app)
      .patch('/api/users/avatar')
      .set({ Authorization: '22' })
      .attach('image', testData.user.link)
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})

describe('DELETE /api/users/delete', () => {
  it('Return 200 OK', (done) => {
    chai
      .request(app)
      .delete('/api/users/delete')
      .set({ Authorization: accessToken })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        done()
      })
  })
  it('Return 400 Bad request when accessToken is not valid', (done) => {
    chai
      .request(app)
      .delete('/api/users/delete')
      .set({ Authorization: 'random' })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.equal(false)
        done()
      })
  })
})
