import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { setUser } from './reducers/userReducer'
import DataView from './containers/DataView'
import MyFarmsView from './containers/MyFarmsView'
import SingleFarmView from './containers/SingleFarmView'
import NavigationBar from './components/NavigationBar'
import NotificationContainer from './containers/NotificationContainer'
import AuthView from './containers/AuthView'
import IndexView from './containers/IndexView'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './containers/RequireAuth'
import NoDataFoundErrorBoundary from './components/errors/NoDataFoundErrorBoundary'
import { StyledBodyDiv, StyledCenteredBodyDiv } from './styles'

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
      <div style={{ fontFamily: 'Arial', height: '100vh' }}>
        <NavigationBar />
        <NotificationContainer />
        <Routes>
          <Route path='/' element={
            <StyledBodyDiv>
              <IndexView />
            </StyledBodyDiv>
          } />
          <Route path='/login' element={
            <StyledCenteredBodyDiv>
              <AuthView />
            </StyledCenteredBodyDiv>
          } />
          <Route path='/farms/:id' element={
            <RequireAuth>
              <StyledBodyDiv>
                <ErrorBoundary FallbackComponent={NoDataFoundErrorBoundary}>
                  <SingleFarmView />
                </ErrorBoundary>
              </StyledBodyDiv>
            </RequireAuth>
          }
          />
          <Route path='/farms' element={
            <RequireAuth>
              <StyledBodyDiv>
                <MyFarmsView />
              </StyledBodyDiv>
            </RequireAuth>
          }
          />
          <Route path= '/data' element={
            <RequireAuth>
              <StyledBodyDiv>
                <ErrorBoundary FallbackComponent={NoDataFoundErrorBoundary}>
                  <DataView />
                </ErrorBoundary>
              </StyledBodyDiv>
            </RequireAuth>
          }
          />
          <Route path='*' element={ <Navigate to='/' /> } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
