import React, { useEffect } from 'react'
import { StyledNotification } from '../styles'

const Notification = ({ notification, beginCloseTimeout }) => {
  useEffect(() => {
    beginCloseTimeout(notification.id, notification.time)
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