import React, { useState } from 'react'

const LoginForm = ({ handler }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setPassword('')
    setUsername('')
    await handler(username, password)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ handleLogin }>
        <input type="text" value={username} id="username" name="Username" onChange={({ target }) => setUsername(target.value)}/>
        <input type="text" value={password} id="password" name="Password" onChange={({ target }) => setPassword(target.value)}/>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm