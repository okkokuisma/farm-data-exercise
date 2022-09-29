const supertest = require('supertest')

const app = require('../app')
const userService = require('../db/services/userService')
const { emptyDatabase } = require('../db/dbInit')

const api = supertest(app)

describe('login', () => {
  beforeAll(async () => {
    await emptyDatabase()
  })

  test('succeeds with valid credentials', async () => {
    await userService.create({ username: 'username', password: 'Guatemal4!' })

    await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'Guatemal4!' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        if (!res.body.username === 'username') throw new Error()
      })
  })

  test('fails with invalid credentials', async () => {
    await api
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'nameuser', password: 'wordpass' })
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .expect({error: 'invalid username or password'})
  })
})