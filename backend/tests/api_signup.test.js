const supertest = require('supertest')

const app = require('../app')
const { emptyDatabase } = require('../db/dbInit')

const api = supertest(app)

describe('signup', () => {
  beforeAll(async () => {
    await emptyDatabase()
  })

  test('succeeds with valid credentials', async () => {
    await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'Guatemal4!' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        if (!res.body.username === 'username') throw new Error()
      })
  })

  test('fails with invalid credentials and prints the correct error message', async () => {
    await api
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({ username: 'nameuser', password: 'wordpass' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Password should contain minimum eight characters, at  least one uppercase letter, one lowercase letter, one number and one special character' })
  })
})