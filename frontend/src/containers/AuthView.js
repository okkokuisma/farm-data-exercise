import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import { newNotification } from '../services/notificationService'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

const AuthView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()

  if (user) {
    return <Navigate to={'/data'}/>
  }

  const from = location.state?.from?.pathname || '/data'

  const handleLogin = async (username, password) => {
    try {
      await login({ username, password })
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
      newNotification({
        message: 'Invalid username or password',
        type: 'error',
        time: 3000
      })
    }
  }

  return (
    <>
      <LoginForm handler={handleLogin}/>
    </>
  )
}

export default AuthView