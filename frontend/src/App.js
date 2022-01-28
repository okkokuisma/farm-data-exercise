import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initData } from './reducers/dataReducer'
import { initFarms } from './reducers/farmReducer'
import DataView from './components/DataView'
import FarmsView from './components/FarmsView'
import NavigationBar from './components/NavigationBar'
import Notifications from './components/containers/Notifications'
import { Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initData())
  }, [])

  useEffect(() => {
    dispatch(initFarms())
  }, [])

  return (
    <>
      <div>
        <NavigationBar />
      </div>
      <div style={{padding: '0', marginLeft: '10%'}}>
        <Notifications />
      </div>
      <div className='body' style={{padding: '30px 0px', marginLeft: '12%'}}>
        <Routes>
          <Route path='/farms' element={ <FarmsView /> } />
          <Route path= '/' element={
            <div>
              <DataView />
            </div> }
          />
          <Route path='*' element={ <Navigate to='/' /> } />
        </Routes>
      </div>
    </>
  )
}

export default App
