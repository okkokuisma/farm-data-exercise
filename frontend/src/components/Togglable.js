import React, { useState } from 'react'

const Togglable = ({ metricType, children }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState(`Show ${metricType} statistics`)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleClick = () => {
    setVisible(!visible)
    setButtonLabel(
      visible ? `Show ${metricType} statistics` : `Hide ${metricType} statistics`
    )
  }

  return (
    <div>
      <button onClick={handleClick}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {children}
      </div>
    </div>
  )
}

export default Togglable