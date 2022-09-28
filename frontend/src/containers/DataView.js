import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataPointTable from '../components/tables/DataPointTable'
import { fetchData } from '../reducers/dataReducer'

const DataView = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const farms = useSelector(state => state.farms)
  const farmNames = farms.map(f => f.name)

  useEffect(() => {
    dispatch(fetchData({}))
    console.log(data)
  }, [])

  // if (!data.length) {
  //   return null
  // }

  return (
    <div>
      <DataPointTable data={data} farms={farmNames} />
    </div>
  )
}

export default DataView
