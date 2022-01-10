import React from 'react'
import { NavBar } from '../styles'

const NavigationBar = () => {
  return (
    <>
      <NavBar>
        <div className='logo'>Farm App</div>
        <div className='links'>
          <a href='www.google.fi'>linkki</a>
          <a href='www.google.fi'>toinen</a>
        </div>
      </NavBar>
    </>
  )
}

export default NavigationBar