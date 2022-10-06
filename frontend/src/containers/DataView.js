import React from 'react'
import { useSelector } from 'react-redux'
// import { useErrorHandler } from 'react-error-boundary'
import DataPointTable from '../components/tables/DataPointTable'
// import { fetchData } from '../reducers/dataReducer'
// import { initFarms } from '../reducers/farmReducer'

const DataView = () => {
  // const dispatch = useDispatch()
  // const handleError = useErrorHandler()
  const data = useSelector(state => state.data)
  const farms = useSelector(state => state.farms)
  console.log(farms)

  // useEffect(() => {
  //   dispatch(initFarms({}))
  // }, [])

  return (
    <div>
      <DataPointTable data={data} farms={farms} />
    </div>
  )
}

export default DataView
