import { createNotification } from '../reducers/notificationReducer'
import store from '../store'

export const newNotification = (notification) => {
  store.dispatch(createNotification(notification))
}