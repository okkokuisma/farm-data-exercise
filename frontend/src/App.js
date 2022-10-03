import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './reducers/userReducer'
import DataView from './containers/DataView'
import FarmsView from './containers/FarmsView'
import NavigationBar from './components/NavigationBar'
// import Notifications from './containers/Notifications'
import AuthView from './containers/AuthView'
import IndexView from './containers/IndexView'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './containers/RequireAuth'
import { initFarms } from './reducers/farmReducer'
import { StyledBodyDiv } from './styles'


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

  useEffect(() => {
    dispatch(initFarms())
  }, [])

  return (
    <AuthProvider>
      <div style={{ fontFamily: 'Arial' }}>
        <div>
          <NavigationBar />
        </div>
        <StyledBodyDiv>
          <Routes>
            <Route path='/' element={ <IndexView /> } />
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
            <Route path='*' element={ <Navigate to='/' /> } />
          </Routes>
        </StyledBodyDiv>
      </div>
    </AuthProvider>
  )
}

export default App
