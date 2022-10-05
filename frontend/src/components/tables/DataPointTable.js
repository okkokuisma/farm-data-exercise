import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useErrorHandler } from 'react-error-boundary'

import { fetchData } from '../../reducers/dataReducer'
import { StyledInput, StyledButton } from '../../styles'
import Table from './Table'
import SelectInput from '../inputs/SelectInput'


const DataPointTable = ({ data }) => {
  const [ queryParams, setQueryParams ] = useState({})
  const dispatch = useDispatch()
  // const handleError = useErrorHandler()

  useEffect(() => {
    dispatch(fetchData(queryParams))
  }, [queryParams])

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

  const handleFilterChange = ({filter}, newValue) => {
    // eslint-disable-next-line no-unused-vars
    const { [filter]: prevValue, ...otherParams } = queryParams

    if (filter === 'after') {
      delete otherParams.before
    } else if (filter === 'before') {
      delete otherParams.after
    }

    if (newValue === '') {
      setQueryParams({...otherParams})
    } else {
      setQueryParams({[filter]: newValue, ...otherParams})
    }
  }

  if (!data.edges) return null

  const { pageInfo, edges } = data
  const nodes = edges.map(e => e.node)

  const tableRows = nodes.map(node => {
    const { farm, dateTime, metricType, metricValue } = node
    return (
      [
        <Link key={farm.id} to={`/farms/${farm.id}`}>{farm.name}</Link>,
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

  const metricTypeSelectOptions = [
    {name: 'All', value: ''},
    {name: 'Rain fall', value: 'rainFall'},
    {name: 'Temperature', value: 'temperature'},
    {name: 'pH', value: 'pH'},
  ]

  return (
    <>
      <StyledInput
        type='text'
        placeholder='Filter by farm'
        onChange={(e) => handleFilterChange({filter: 'search'}, e.target.value)}
      />
      <SelectInput
        options={metricTypeSelectOptions}
        onChange={(e) => handleFilterChange({filter: 'metricType'}, e.target.value)}
      />
      <StyledInput
        type='date'
        onChange={e => handleFilterChange({filter: 'from'}, e.target.value)}
      />
      <StyledInput
        type='date'
        onChange={e => handleFilterChange({filter: 'to'}, e.target.value)}
      />
      <Table rows={tableRows} headers={tableHeaders} />
      <StyledButton
        onClick={() => handleFilterChange({filter: 'before'}, pageInfo.startCursor)}
        disabled={!pageInfo.hasPreviousPage}
      >
        Previous
      </StyledButton>
      <StyledButton
        onClick={() => handleFilterChange({filter: 'after'}, pageInfo.endCursor)}
        disabled={!pageInfo.hasNextPage}
      >
        Next
      </StyledButton>
    </>
  )
}

export default DataPointTable