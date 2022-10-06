import React from 'react'
import { StyledNavBar } from '../styles'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NavigationBar = () => {
  const { user, logout } = useAuth()

  return (
    <>
      <StyledNavBar>
        <div className='links'>
          <Link to='/'>home</Link>
          {user
            ?
            <>
              <Link to='/data'>data</Link>
              <Link to='/farms'>my farms</Link>
              <button onClick={() => logout()}>log out</button>
            </>
            : <Link to='/login'>login</Link>
          }
        </div>
      </StyledNavBar>
    </>
  )
}

export default NavigationBar