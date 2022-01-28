import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../Notification'
import { deleteNotification } from '../../reducers/notificationReducer'

const Notifications = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const notifications = useSelector(state => state.notifications)

  useEffect(() => {
    setShow(notifications.length > 0)
  }, [notifications])

  const beginCloseTimeout = (id, time) => {
    return setTimeout(() => dispatch(deleteNotification(id)), time)
  }

  return show ? (
    <>
      {notifications.map(notification => (
        <Notification
          notification={notification}
          beginCloseTimeout={beginCloseTimeout}
          key={notification.id}
        />
      ))}
    </>
  )
  : null
}

export default Notifications