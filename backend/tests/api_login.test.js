const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('login succeeds with valid credentials', async () => {
  await api
    .post('/api/auth/login')
    .set('Content-Type', 'application/json')
    .send({ username: 'username', password: 'password' })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})