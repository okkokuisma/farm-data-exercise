import { useErrorHandler as useErrorBoundary } from 'react-error-boundary'
import { useDispatch } from 'react-redux'

import { useAuth } from '../contexts/AuthContext'
import { createNotification } from '../reducers/notificationReducer'

const useErrorHandler = () => {
  const renderErrorBoundary = useErrorBoundary()
  const dispatch = useDispatch()
  const { logout } = useAuth()

  const handleError = (error) => {
    if (error.response.data.type === 'JsonWebTokenError' || error.response.data.type === 'TokenExpiredError') {
      logout()
    } else if (error.response.data.type === 'UsernameTakenError') {
      dispatch(createNotification({
        message: 'Username already taken.',
        type: 'error',
        time: 3000
      }))
    } else if (error.response.data.type === 'InvalidAuthenticationError') {
      dispatch(createNotification({
        message: 'Invalid username or password',
        type: 'error',
        time: 3000
      }))
    } else {
      renderErrorBoundary(error)
    }
  }

  return handleError
}

export default useErrorHandler