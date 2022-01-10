import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initData } from './reducers/dataReducer'
import { initFarms } from './reducers/farmReducer'
import FarmsView from './components/FarmsView'
import NavigationBar from './components/NavigationBar'

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
      <div className='body' style={{paddingTop: '60px'}}>
        <FarmsView />
      </div>
    </>
  )
}

export default App
