import React from 'react'
import { NavBar } from '../styles'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <>
      <NavBar>
        <div className='logo'>Farm App</div>
        <div className='links'>
          <Link to='/'>data</Link>
          <Link to='/farms'>farms</Link>
        </div>
      </NavBar>
    </>
  )
}

export default NavigationBar