import React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../contexts/AuthContext'
import { createNotification } from '../reducers/notificationReducer'

const AuthView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  const from = location.state?.from?.pathname || '/data'

  if (user) {
    return <Navigate to={from}/>
  }

  const handleLogin = async (username, password) => {
    login({ username, password })
      .then(() => navigate(from, { replace: true }))
      .catch(() => dispatch(createNotification({
        message: 'Invalid username or password',
        type: 'error',
        time: 3000
      })))
  }

  return (
    <LoginForm handler={handleLogin}/>
  )
}

export default AuthView