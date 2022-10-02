import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../reducers/dataReducer'

import { StyledInput } from '../../styles'
import Table from './Table'
import SelectInput from '../inputs/SelectInput'


const DataPointTable = ({ data }) => {
  const [ queryParams, setQueryParams ] = useState({})
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
    setQueryParams({...otherParams, ...sortValues})
  }

  const handleMetricTypeFilter = (e) => {
    // eslint-disable-next-line no-unused-vars
    const {metricType, ...otherParams} = queryParams
    const selectedMetricType = e.target.value
    if (selectedMetricType === 'all') {
      setQueryParams({...otherParams})
    } else {
      setQueryParams({metricType: selectedMetricType, ...otherParams})
    }
  }

  const handleFarmFilter = (e) => {
    // eslint-disable-next-line no-unused-vars
    const {search, ...otherParams} = queryParams
    const searchWord = e.target.value
    if (searchWord === '') {
      setQueryParams({...otherParams})
    } else {
      setQueryParams({search: searchWord, ...otherParams})
    }
  }

  useEffect(() => {
    dispatch(fetchData(queryParams))
  }, [queryParams])

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
      <StyledInput type='text' onChange={handleFarmFilter} />
      <SelectInput options={metricTypeSelectOptions} onChange={handleMetricTypeFilter} />
      <Table rows={tableRows} headers={tableHeaders} />
    </>
  )
}

export default DataPointTable