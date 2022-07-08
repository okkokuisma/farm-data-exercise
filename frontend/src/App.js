import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { initData } from './reducers/dataReducer'
// import { initFarms } from './reducers/farmReducer'
import { setUser } from './reducers/userReducer'
import DataView from './containers/DataView'
import FarmsView from './containers/FarmsView'
import NavigationBar from './components/NavigationBar'
import Notifications from './containers/Notifications'
import AuthView from './containers/AuthView'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './containers/RequireAuth'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <AuthProvider>
      <div style={{padding: '0', marginLeft: '10%'}}>
        <Notifications />
      </div>
      <div>
        <NavigationBar />
      </div>
      <div className='body' style={{padding: '60px 0px', marginLeft: '12%'}}>
        <Routes>
          <Route path='/login' element={ <AuthView /> } />
          <Route path='/farms' element={
            <RequireAuth>
              <FarmsView />
            </RequireAuth>
          }
          />
          <Route path= '/data' element={
            <RequireAuth>
              <DataView />
            </RequireAuth>
          }
          />
          <Route path='*' element={ <Navigate to='/login' /> } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
