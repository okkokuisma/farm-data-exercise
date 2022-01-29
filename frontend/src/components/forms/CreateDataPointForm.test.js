import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CreateDataPointForm from './CreateDataPointForm'

const mockHandler = jest.fn()
const mockFarms = [
  {name: 'Test Farm', id: 1},
  {name: 'Another Test Farm', id: 2}
]

test('form cannot be submitted without selecting a valid farm', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('form cannot be submitted with invalid date', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.clear(screen.getByLabelText('Date and time'))
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('form cannot be submitted with invalid rain fall values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['Rain fall'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '-5')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)

  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '600')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('form can be submitted with valid rain fall values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['Rain fall'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '400')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('form cannot be submitted with invalid temperature values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['Temperature'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '-60')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)

  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '101')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('form can be submitted with valid temperature values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['Temperature'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '22')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('form cannot be submitted with invalid ph values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['pH'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '-2')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)

  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '15')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('form can be submitted with valid ph values', () => {
  render(<CreateDataPointForm farms={mockFarms} handler={mockHandler} />)

  userEvent.selectOptions(screen.getByLabelText('Farm'), ['Test Farm'])
  userEvent.selectOptions(screen.getByLabelText('Metric type'), ['pH'])
  userEvent.clear(screen.getByLabelText('Metric value'))
  userEvent.type(screen.getByLabelText('Metric value'), '7')
  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(1)
})