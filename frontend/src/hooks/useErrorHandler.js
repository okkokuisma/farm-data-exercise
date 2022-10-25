import { useErrorHandler as useErrorBoundary } from 'react-error-boundary'
import { useAuth } from '../contexts/AuthContext'

const useErrorHandler = () => {
  const renderErrorBoundary = useErrorBoundary()
  const { logout } = useAuth()

  const handleError = (error) => {
    if (error.response.status === 401) {
      logout()
    } else {
      renderErrorBoundary(error)
    }
  }

  return handleError
}

export default useErrorHandler