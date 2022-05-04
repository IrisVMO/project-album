// const chai = require('chai')
// const fs = require('fs')
// const jwt = require('jsonwebtoken')
// const { jwtAccessKey } = require('../../configs/config')
// const chaiHttp = require('chai-http')
// const app = require('../../../index')
// const { Album } = require('./album.model')
// const { User } = require('../photos/user.model')
// const { it, describe, before } = require('mocha')

// const expect = chai.expect

// const testData = {
//   user: {
//     username: 'awer',
//     password: 'naaaam0123',
//     email: 'abcs@gmail.com'
//   },
//   albums: {
//     name: 'May tour',
//     description: 'A great stay',
//     status: {
//       public: 'Public',
//       private: 'Private'
//     }
//   },
//   photos: {
//     name: 'May tour',
//     link: 'imgtest/im3.jpg'
//   }

// }

// let accessToken, albumId, userId

// chai.use(chaiHttp)

// describe('POST /api/photos', () => {
//   before(async () => {
//     const user = await User.create({ ...testData.user })
//     const album = await Album.create({ ...testData.albums })
//     userId = user.Id
//     albumId = album.id
//     accessToken = jwt.sign(userId, jwtAccessKey, { expiresIn: '10days' })
//   })

//   it('Return status 200 with new data photo', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .attach('image', fs.readFileSync(testData.photos.link))
//       .send({
//         name: testData.photos.name,
//         albumId,
//         userId
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         id = res.body.data.photo.id
//         done()
//       })
//   })

//   it('return 400 bad request when validate failed', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .attach('image', fs.readFileSync(testData.photos.link))
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: '',
//         albumId
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })

// describe('GET /api/photos', () => {
//   it('Return status 200 and photo data', (done) => {
//     chai
//       .request(app)
//       .post(`/api/photos/${id}`)
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when password length less than 6', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: '',
//         description: testData.photos.description
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })

// describe('POST /api/photos', () => {
//   it('return status 200 and new user accessToken', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: testData.photos.description
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when password length less than 6', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: ''
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })

// describe('POST /api/photos', () => {
//   it('return status 200 and new user accessToken', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: testData.photos.description
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when password length less than 6', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: ''
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })

// describe('POST /api/photos', () => {
//   it('return status 200 and new user accessToken', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: testData.photos.description
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when password length less than 6', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: ''
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })

// describe('POST /api/photos', () => {
//   it('return status 200 and new user accessToken', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: testData.photos.description
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when password length less than 6', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({
//         name: testData.photos.name,
//         description: ''
//       })
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Validation failed
//         done()
//       })
//   })
// })
