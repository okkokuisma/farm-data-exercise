import React, { useState } from 'react'
import { StyledToggleButton } from '../styles'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonStyleWhenVisible = { backgroundColor: 'white', color: 'black' }
  const divStyleWhenVisible = { margin: '0px 10px', borderLeft: '5pt solid sandybrown', borderRadius: '5px' }

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div style={visible ? divStyleWhenVisible : {}}>
      <StyledToggleButton
        as='button'
        style={visible ? buttonStyleWhenVisible : {}}
        onClick={handleClick}
      >
        {buttonLabel}
      </StyledToggleButton>
      <div style={showWhenVisible}>
        <div style={{ margin: '10px 5px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Togglable