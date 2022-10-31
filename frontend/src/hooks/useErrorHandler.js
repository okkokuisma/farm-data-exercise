import { useErrorHandler as useErrorBoundary } from 'react-error-boundary'
import { useDispatch } from 'react-redux'

import { useAuth } from '../contexts/AuthContext'
import { createNotification } from '../reducers/notificationReducer'

const useErrorHandler = () => {
  const renderErrorBoundary = useErrorBoundary()
  const dispatch = useDispatch()
  const { logout } = useAuth()

  const handleError = (error) => {
    const errorType = error.response.data.type
    if (errorType === 'JsonWebTokenError' || errorType === 'TokenExpiredError') {
      logout()
    } else if (errorType === 'UsernameTakenError') {
      dispatch(createNotification({
        message: 'Username already taken.',
        type: 'error',
        time: 3000
      }))
    } else if (errorType === 'InvalidAuthenticationError') {
      dispatch(createNotification({
        message: 'Invalid username or password',
        type: 'error',
        time: 3000
      }))
    } else if (errorType === 'InvalidFileUploadError') {
      dispatch(createNotification({
        message: 'Uploaded file contained invalid data',
        type: 'error',
        time: 3000
      }))
    }
    else {
      renderErrorBoundary(error)
    }
  }

  return handleError
}

export default useErrorHandler