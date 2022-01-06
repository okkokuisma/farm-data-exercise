import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initData } from './reducers/dataReducer'

function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  // const memoData = useMemo(() => data, [data])

  useEffect(() => {
    dispatch(initData())
  }, [])

  return (
    <div className="App">
      <ul>
        {data.map(dataPoint =>
          <li key={ dataPoint.id }>
            { `${dataPoint.metricType} ${dataPoint.metricValue}` }
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
