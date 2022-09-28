import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../reducers/dataReducer'

import { StatTable, TableCell, TableHead } from '../../styles'
import SelectColumnFilter from './filters/SelectColumnFilter'

const TableRow = ({ values }) => {
  return (
    <tr>
      {values.map((value, i) => (
        <TableCell key={i} as='td'>
          {value}
        </TableCell>
      ))}
    </tr>
  )
}

const DataPointTable = ({ data, farms }) => {
  const [ queryParams, setQueryParams ] = useState({})
  const [ selectedFarm, setSelectedFarm ] = useState('all')
  const dispatch = useDispatch()

  const handleSort = (header) => {
    const { sort_by, order_by, ...otherParams } = queryParams
    let sortValues = {}
    if (sort_by === header) {
      sortValues = order_by === 'desc'
        ? {order_by: 'asc', sort_by: header}
        : {}
    } else {
      sortValues = {order_by: 'desc', sort_by: header}
    }
    console.log(sortValues)
    setQueryParams({...otherParams, ...sortValues})
  }

  const handleFarmSelect = (selectedFarm) => {
    // eslint-disable-next-line no-unused-vars
    const {search, ...otherParams} = queryParams
    if (selectedFarm === 'all') {
      setQueryParams({...otherParams})
    } else {
      setQueryParams({search: selectedFarm, ...otherParams})
    }
    setSelectedFarm(selectedFarm)
  }

  useEffect(() => {
    dispatch(fetchData(queryParams))
  }, [queryParams])

  // useEffect(() => {
  //   if (selectedFarm) {
  //     dispatch(fetchData(sort))
  //   }
  // }, [selectedFarm])

  if (!data.edges) return null

  const nodes = data.edges.map(e => e.node)

  return (
    <>
      <SelectColumnFilter setSelected={handleFarmSelect} selected={selectedFarm} options={farms} />
      <StatTable>
        <TableHead>
          <tr>
            <TableCell as='th'>
              Farm
            </TableCell>
            <TableCell as='th'>
              Metric Type
            </TableCell>
            <TableCell as='th' onClick={() => handleSort('metricValue')}>
              Metric Value
              {queryParams.sort_by !== 'metricValue' ? null : queryParams.order_by === 'desc' ? <span>&#9660;</span> : <span>&#9650;</span>}
            </TableCell>
            <TableCell as='th' onClick={() => handleSort('dateTime')}>
              Date
              {queryParams.sort_by !== 'dateTime' ? null : queryParams.order_by === 'desc' ? <span>&#9660;</span> : <span>&#9650;</span>}
            </TableCell>
          </tr>
        </TableHead>

        <tbody>
          {nodes.map((node) => {
            const { farm, dateTime, metricType, metricValue } = node
            return (
              <TableRow key={node.id} values={[
                farm.name,
                metricType,
                metricValue,
                dateTime
              ]} />
            )
          })}
        </tbody>
      </StatTable>
    </>
  )
}

export default DataPointTable