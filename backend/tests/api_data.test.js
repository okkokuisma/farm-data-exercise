const supertest = require('supertest')

const app = require('../app')
const { emptyDatabase } = require('../db/dbInit')
const farmService = require('../db/services/farmService')
const userService = require('../db/services/userService')

// const api = supertest(app)
const agent = supertest.agent(app)

describe('data point', () => {
  let farm

  beforeAll(async () => {
    await emptyDatabase()

    await userService.create({ username: 'username', password: 'Guatemal4!' })
    farm = await farmService.create({ name: 'testFarm' })
    await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ username: 'username', password: 'Guatemal4!' })
  })

  test('can be added with valid values', async () => {
    await agent
      .post('/api/data')
      .set('Content-Type', 'application/json')
      .send({
        farmId: farm.id,
        dateTime: new Date(),
        metricType: 'temperature',
        metricValue: '25'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('is not created with invalid metric type', async () => {
    await agent
      .post('/api/data')
      .set('Content-Type', 'application/json')
      .send({
        farmId: farm.id,
        dateTime: new Date(),
        metricType: 'snowFall',
        metricValue: '25'
      })
      .expect(400)
      .expect({error: 'added data point contained invalid values'})
  })

  test('is not created with invalid date', async () => {
    await agent
      .post('/api/data')
      .set('Content-Type', 'application/json')
      .send({
        farmId: farm.id,
        dateTime: '2019-02-31T01:58:16.034Z',
        metricType: 'rainFall',
        metricValue: '25'
      })
      .expect(400)
      .expect({error: 'added data point contained invalid values'})
  })

  test('is not created with invalid metric type', async () => {
    await agent
      .post('/api/data')
      .set('Content-Type', 'application/json')
      .send({
        farmId: farm.id,
        dateTime: new Date(),
        metricType: 'rainFall',
        metricValue: '-0.1'
      })
      .expect(400)
      .expect({error: 'added data point contained invalid values'})
  })

  test('is not created with missing farm id', async () => {
    await agent
      .post('/api/data')
      .set('Content-Type', 'application/json')
      .send({
        dateTime: new Date(),
        metricType: 'rainFall',
        metricValue: '25'
      })
      .expect(400)
      .expect({error: 'No farms found with the given id.'})
  })
})