import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import dataReducer from './reducers/dataReducer'
import farmReducer from './reducers/farmReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  data: dataReducer,
  farms: farmReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store