import React, { useState } from 'react'
import { ToggleButton } from '../styles'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <ToggleButton as='button' onClick={handleClick}>{buttonLabel}</ToggleButton>
      <div style={showWhenVisible}>
        <div style={{ padding: '10px 20px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Togglable