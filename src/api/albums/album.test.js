const chai = require('chai')
const jwt = require('jsonwebtoken')
const { jwtAccessKey } = require('../../configs/config')
const chaiHttp = require('chai-http')
const app = require('../../../index')
const { User } = require('../users/user.model')
const { it, describe, before } = require('mocha')
const expect = chai.expect

const testData = {
  user1: {
    username: 'awer2',
    password: 'naaaam01231',
    email: 'abcs1@gmail.com'
  },
  user2: {
    username: 'anam1',
    password: 'nam123',
    email: 'anam1@gmail.com'
  },
  albums: {
    name: 'May tour',
    description: 'A great stay',
    status: {
      public: 'Public',
      private: 'Private'
    }
  }

}

let accessToken, id, userId2, token2

chai.use(chaiHttp)

describe('POST /api/albums/', () => {
  before(async () => {
    const user1 = await User.create({ ...testData.user1 })
    accessToken = jwt.sign({ id: user1.id }, jwtAccessKey, { expiresIn: '10days' })
    const user2 = await User.create({ ...testData.user2 })
    userId2 = user2.id
    token2 = jwt.sign({ id: user2.id }, jwtAccessKey, { expiresIn: '10days' })
  })
  it('Return status 200 and new album', (done) => {
    chai
      .request(app)
      .post('/api/albums/')
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: testData.albums.name,
        description: testData.albums.description
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('success')
        expect(res.body).to.have.property('data')
        expect(res.body.success).to.equal(true)
        id = res.body.data.id
        done()
      })
  })

  it('return 400 bad request when validate failed', (done) => {
    chai
      .request(app)
      .post('/api/albums/')
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: null,
        description: null
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })
})

describe('GET /api/albums/getone/:id', () => {
  it('Return status 200 and album data', (done) => {
    chai
      .request(app)
      .get(`/api/albums/getone/${id}`)
      .set({ Authorization: accessToken })
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

  it('Return 400 bad request when params validate failed', (done) => {
    chai
      .request(app)
      .get(`/api/albums/getone/${null}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })
})

describe('PATCH /api/albums/:id', () => {
  it('Return status 200 and result', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/${id}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: testData.albums.name,
        description: testData.albums.description
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

  it('Return 401 Unauthorized when null token', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/${id}`)
      .set({ Authorization: '' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: testData.albums.name,
        description: testData.albums.description
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(401)
        done()
      })
  })

  it('Return 400 bad request when params validation failed', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/${null}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: '',
        description: testData.albums.description
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })
})

describe('GET /api/albums/getall', () => {
  it('Return status 200 and all album', (done) => {
    chai
      .request(app)
      .get('/api/albums/getall')
      .set({ Authorization: accessToken })
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

  it('Return 400 bad request when invalid token', (done) => {
    chai
      .request(app)
      .get('/api/albums/getall')
      .set({ Authorization: 'dakjas.dajak.ass' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400)
        done()
      })
  })

  it('Return 401 Unauthorized when null token', (done) => {
    chai
      .request(app)
      .get('/api/albums/getall')
      .set({ Authorization: '' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(401) // Unauthorized
        done()
      })
  })
})

describe('POST /api/albums/invite/:id', () => {
  it('Return status 200 when invited successfully', (done) => {
    chai
      .request(app)
      .post(`/api/albums/invite/${id}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        userIdInvite: userId2
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

  it('Return 400 bad request when body validate failed', (done) => {
    chai
      .request(app)
      .post(`/api/albums/invite/${id}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        userIdInvite: null
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })

  it('Return 400 bad request when invalid token', (done) => {
    chai
      .request(app)
      .post(`/api/albums/invite/${id}`)
      .set({ Authorization: 'afhda.ajskdf.aaa' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        userIdInvite: userId2
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Invalid token
        done()
      })
  })

  it('Return 401 Unauthorized when null token', (done) => {
    chai
      .request(app)
      .post(`/api/albums/invite/${id}`)
      .set({ Authorization: '' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        userIdInvite: userId2
      })
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(401)
        done()
      })
  })
})

describe('PATCH /api/albums/reply/:accessToken', () => {
  it('Return status 200 and status reply', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/reply/${token2}?status=Active&albumid=${id}`)
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

  it('Return 400 bad request when validation failed', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/reply/${token2}?status=Active&albumid=${null}`)
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })

  it('Return 401 Unauthorized when null token', (done) => {
    chai
      .request(app)
      .patch(`/api/albums/reply/${''}?status=Active&albumid=${id}`)
      .set({ Authorization: '' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(401)
        done()
      })
  })
})

describe('DELETE /api/albums/:id', () => {
  it('Return status 200', (done) => {
    chai
      .request(app)
      .delete(`/api/albums/${id}`)
      .set({ Authorization: accessToken })
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

  it('Return 400 bad request when params id validation failed', (done) => {
    chai
      .request(app)
      .delete(`/api/albums/${null}`)
      .set({ Authorization: accessToken })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(400) // Validation failed
        done()
      })
  })

  it('Return 401 Unauthorized when null token', (done) => {
    chai
      .request(app)
      .delete(`/api/albums/${id}`)
      .set({ Authorization: '' })
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).to.have.status(401) // Validation failed
        done()
      })
  })
})
