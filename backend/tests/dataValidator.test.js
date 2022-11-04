const validator = require('../src/utils/dataValidator')
const { mapDataValueRows } = require('./testHelper')

test('only valid metric types are accepted', () => {
  const data = mapDataValueRows([
    [
      "Too high temperature",
      '2019-01-04T21:23:59.766Z',
      'temperature',
      '13'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-04T00:45:08.927Z',
      'pH',
      '7'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-04T01:58:16.034Z',
      'rainFall',
      '15'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-04T01:58:16.034Z',
      'snowFall',
      '15'
    ]
  ])

  expect(validator.validateDataPointValues(data[0])).toBe(true)
  expect(validator.validateDataPointValues(data[1])).toBe(true)
  expect(validator.validateDataPointValues(data[2])).toBe(true)
  expect(validator.validateDataPointValues(data[3])).toBe(false)
})

test('temperature is validated correctly', () => {
  const data = mapDataValueRows([
    [
      "Too high temperature",
      '2019-01-04T21:23:59.766Z',
      'temperature',
      '102'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-04T00:45:08.927Z',
      'temperature',
      '-50.2'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-04T01:58:16.034Z',
      'temperature',
      '-13.0'
    ]
  ])

  expect(validator.validateDataPointValues(data[0])).toBe(false)
  expect(validator.validateDataPointValues(data[1])).toBe(false)
  expect(validator.validateDataPointValues(data[2])).toBe(true)
})

test('pH is validated correctly', () => {
  const data = mapDataValueRows([
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-03T23:02:48.926Z',
      'pH',
      '15.1'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-05T01:58:16.034Z',
      'pH',
      '-0.5'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-05T01:58:16.034Z',
      'pH',
      '6.56'
    ]
  ])

  expect(validator.validateDataPointValues(data[0])).toBe(false)
  expect(validator.validateDataPointValues(data[1])).toBe(false)
  expect(validator.validateDataPointValues(data[2])).toBe(true)
})

test('rainfall is validated correctly', () => {
  const data = mapDataValueRows([
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-05T01:58:16.034Z',
      'rainFall',
      '665'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-03T23:02:48.926Z',
      'rainFall',
      '-0.3'
    ],
    [
      "Organic Ossi's Impact That Lasts plantase",
      '2019-01-03T23:02:48.926Z',
      'rainFall',
      '3.5'
    ]
  ])
  expect(validator.validateDataPointValues(data[0])).toBe(false)
  expect(validator.validateDataPointValues(data[1])).toBe(false)
  expect(validator.validateDataPointValues(data[2])).toBe(true)
})

test('passwords are validated correctly', () => {
  expect(validator.validatePassword('guatemala')).toBe(false)
  expect(validator.validatePassword('Guatemala')).toBe(false)
  expect(validator.validatePassword('Guatemal4')).toBe(false)
  expect(validator.validatePassword('Guatemal!')).toBe(false)
  expect(validator.validatePassword('guatemal4!')).toBe(false)
  expect(validator.validatePassword('GUATEMALA4!')).toBe(false)
  expect(validator.validatePassword('Guaal4!')).toBe(false)
  expect(validator.validatePassword('Guatemal4!')).toBe(true)
})