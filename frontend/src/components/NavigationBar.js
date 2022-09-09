import React from 'react'
import { NavBar } from '../styles'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NavigationBar = () => {
  const { user, logout } = useAuth()

  return (
    <>
      <NavBar>
        <div className='links'>
          <Link to='/'>home</Link>
          <Link to='/data'>data</Link>
          <Link to='/farms'>farms</Link>
          {user
            ? <button onClick={() => logout()}>log out</button>
            : <Link to='/login'>login</Link>
          }
        </div>
      </NavBar>
    </>
  )
}

export default NavigationBar