import React, { useState, useEffect } from 'react'
import { StyledNotification } from '../styles'

const Notification = ({ notification, beginCloseTimeout }) => {
  const [closeTimeout, setCloseTimeout] = useState(null)

  useEffect(() => {
    setCloseTimeout(beginCloseTimeout(notification.id, notification.time))
  }, [])

  return (
    <StyledNotification>
      <div className={notification.type}>
        {notification.message}
      </div>
    </StyledNotification>
  )
}

export default Notification