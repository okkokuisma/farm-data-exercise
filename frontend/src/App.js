import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initData } from './reducers/dataReducer'
import { initFarms } from './reducers/farmReducer'
import DataView from './components/DataView'
import FarmsView from './components/FarmsView'
import NavigationBar from './components/NavigationBar'
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
      <NavigationBar />
      <div className='body' style={{paddingTop: '60px', margin: '0 auto', maxWidth: '1200px'}}>
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
