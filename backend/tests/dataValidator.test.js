const validator = require('../services/dataValidator')

test('only valid metric types are accepted', () => {
  const data = [
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
  ]

  expect(validator.validateCsvRow(data[0])).toBe(true)
  expect(validator.validateCsvRow(data[1])).toBe(true)
  expect(validator.validateCsvRow(data[2])).toBe(true)
  expect(validator.validateCsvRow(data[3])).toBe(false)
})

test('temperature is validated correctly', () => {
  const data = [
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
  ]

  expect(validator.validateCsvRow(data[0])).toBe(false)
  expect(validator.validateCsvRow(data[1])).toBe(false)
  expect(validator.validateCsvRow(data[2])).toBe(true)
})

test('pH is validated correctly', () => {
  const data = [
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
  ]

  expect(validator.validateCsvRow(data[0])).toBe(false)
  expect(validator.validateCsvRow(data[1])).toBe(false)
  expect(validator.validateCsvRow(data[2])).toBe(true)
})

test('rainfall is validated correctly', () => {
  const data = [
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
  ]

  expect(validator.validateCsvRow(data[0])).toBe(false)
  expect(validator.validateCsvRow(data[1])).toBe(false)
  expect(validator.validateCsvRow(data[2])).toBe(true)
})

test('validateCsvFile returns only valid lines', async () => {
  const output = await validator.validateCsvFile('data.csv')
  expect(output).toHaveLength(3)
})