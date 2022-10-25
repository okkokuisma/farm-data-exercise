import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import dataReducer from './reducers/dataReducer'
import farmReducer from './reducers/farmReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import statReducer from './reducers/statReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  data: dataReducer,
  farms: farmReducer,
  notifications: notificationReducer,
  user: userReducer,
  stats: statReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store