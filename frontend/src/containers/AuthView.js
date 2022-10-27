import React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import LoginForm from '../components/forms/LoginForm'
import SignUpForm from '../components/forms/SignUpForm'
import { useAuth } from '../contexts/AuthContext'
import { createNotification } from '../reducers/notificationReducer'
import { signup } from '../services/userService'

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

  const handleSignUp = async (credentials) => {
    try {
      const user = await signup(credentials)
      dispatch(createNotification({
        message: `User created successfully. Welcome ${user.username}!`,
        type: 'success',
        time: 3000
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <LoginForm handler={handleLogin}/>
      <h2>...or sign up</h2>
      <SignUpForm handler={handleSignUp} />
    </>
  )
}

export default AuthView