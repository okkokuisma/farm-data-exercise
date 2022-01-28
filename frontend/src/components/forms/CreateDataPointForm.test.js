import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import CreateDataPointForm from './CreateDataPointForm'

test('form is not submitted with default values', () => {
  const mockHandler = jest.fn()
  const farms = [
    {name: 'Test Farm', id: 1},
    {name: 'Another Test Farm', id: 2}
  ]

  render(
    <CreateDataPointForm farms={farms} handler={mockHandler} />
  )

  userEvent.click(screen.getByText('Send'))

  expect(mockHandler.mock.calls).toHaveLength(0)
})