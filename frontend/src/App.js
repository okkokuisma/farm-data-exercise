import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { setUser } from './reducers/userReducer'
import DataView from './containers/DataView'
import FarmsView from './containers/FarmsView'
import SingleFarmView from './containers/SingleFarmView'
import NavigationBar from './components/NavigationBar'
import NotificationContainer from './containers/NotificationContainer'
import AuthView from './containers/AuthView'
import IndexView from './containers/IndexView'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './containers/RequireAuth'
import { StyledBodyDiv } from './styles'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <AuthProvider>
      <div style={{ fontFamily: 'Arial' }}>
        <div>
          <NavigationBar />
          <NotificationContainer />
        </div>
        <StyledBodyDiv>
          <Routes>
            <Route path='/' element={ <IndexView /> } />
            <Route path='/login' element={ <AuthView /> } />
            <Route path='/farms/:id' element={
              <RequireAuth>
                <SingleFarmView />
              </RequireAuth>
            }
            />
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
            <Route path='*' element={ <Navigate to='/' /> } />
          </Routes>
        </StyledBodyDiv>
      </div>
    </AuthProvider>
  )
}

export default App
