import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataPointTable from '../components/tables/DataPointTable'
import StatsTable from '../components/tables/StatsTable'
import { initData } from '../reducers/dataReducer'

const DataView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('helou')
    dispatch(initData())
  }, [])

  const data = useSelector(state => state.data)
  const filteredRows = useSelector(state => state.filteredData)

  if (!data.length) {
    return null
  }

  return (
    <div>
      <DataPointTable data={data} />
      <StatsTable data={filteredRows} />
    </div>
  )
}

export default DataView
