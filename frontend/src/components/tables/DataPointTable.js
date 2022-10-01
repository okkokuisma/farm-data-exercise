import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../reducers/dataReducer'

import Table from './Table'
import SelectInput from '../inputs/SelectInput'


const DataPointTable = ({ data }) => {
  const [ queryParams, setQueryParams ] = useState({})
  // const [ selectedFarm, setSelectedFarm ] = useState('all')
  const dispatch = useDispatch()

  const metricTypeSelectOptions = [
    {name: 'All', value: ''},
    {name: 'Rain fall', value: 'rainFall'},
    {name: 'Temperature', value: 'temperature'},
    {name: 'pH', value: 'pH'},
  ]

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

  const handleMetricTypeSelect = (e) => {
    // eslint-disable-next-line no-unused-vars
    const {metricType, ...otherParams} = queryParams
    const selectedMetricType = e.target.value
    if (selectedMetricType === 'all') {
      setQueryParams({...otherParams})
    } else {
      setQueryParams({metricType: selectedMetricType, ...otherParams})
    }
    // setSelectedFarm(selectedFarm)
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
  const tableRows = nodes.map(node => {
    const { farm, dateTime, metricType, metricValue } = node
    return (
      [
        farm.name,
        metricType,
        metricValue,
        dateTime
      ]
    )
  })

  const tableHeaders = [
    {title: 'Farm'},
    {title: 'Metric type'},
    {title: 'Metric value', onClick: () => handleSort('metricValue')},
    {title: 'Date', onClick: () => handleSort('dateTime')}
  ]

  return (
    <>
      {/* <SelectColumnFilter setSelected={handleFarmSelect} selected={selectedFarm} options={farms} /> */}
      <SelectInput options={metricTypeSelectOptions} onChange={handleMetricTypeSelect} />
      <Table rows={tableRows} headers={tableHeaders} />
    </>
  )
}

export default DataPointTable