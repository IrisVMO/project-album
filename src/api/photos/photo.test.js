// const chai = require('chai')
// const jwt = require('jsonwebtoken')
// const { jwtAccessKey } = require('../../configs/config')
// const chaiHttp = require('chai-http')
// const app = require('../../../index')
// const { Album } = require('../albums/album.model')
// const { User } = require('../users/user.model')
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
//     description: 'A great stay'
//   },
//   photos: {
//     name: 'May tour',
//     link: 'imgtest/img1.jpg'
//   }
// }

// let accessToken, albumId, userId, id

// chai.use(chaiHttp)

// describe('POST /api/photos', () => {
//   before(async () => {
//     const user = await User.create({ username: testData.user.username, password: testData.user.password, email: testData.user.email })
//     const album = await Album.create({ name: testData.albums.name, description: testData.albums.description })
//     await user.addAlbum(album, { through: { role: 'Owner' } })
//     userId = user.id
//     albumId = album.id
//     accessToken = jwt.sign({ id: user.id }, jwtAccessKey, { expiresIn: '10days' })
//   })

//   it('Return status 200 with new data photo', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('')
//       .field('albumId', albumId)
//       .field('userId', userId)
//       .field('name', testData.photos.name)
//       .attach('image', testData.photos.link)
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         id = res.body.data.id
//         done()
//       })
//   })

//   it('Return status 400 validation failed', (done) => {
//     chai
//       .request(app)
//       .post('/api/photos')
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .field('albumId', 'asd')
//       .field('userId', userId)
//       .field('name', 2)
//       .attach('image', testData.photos.link)
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400)
//         done()
//       })
//   })
// })

// describe('GET /api/photos', () => {
//   it('Return status 200 and photo data', (done) => {
//     chai
//       .request(app)
//       .get(`/api/photos/getone/${id}`)
//       .set({ Authorization: accessToken })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(200)
//         expect(res.body).to.have.property('success')
//         expect(res.body).to.have.property('data')
//         expect(res.body.success).to.equal(true)
//         done()
//       })
//   })

//   it('return 400 bad request when invalid token', (done) => {
//     chai
//       .request(app)
//       .get(`/api/photos/getone/${id}`)
//       .set({ Authorization: 'random' })
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .end((err, res) => {
//         expect(err).to.equal(null)
//         expect(res).to.have.status(400) // Invalid token
//         done()
//       })
//   })
// })
