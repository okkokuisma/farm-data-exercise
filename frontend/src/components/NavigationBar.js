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
          <Link to='/data'>data</Link>
          <Link to='/farms'>farms</Link>
          {user
            ? <button onClick={() => logout()}>log out</button>
            : null
          }
        </div>
      </NavBar>
    </>
  )
}

export default NavigationBar