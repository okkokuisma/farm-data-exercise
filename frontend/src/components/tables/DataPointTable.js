import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useErrorHandler } from 'react-error-boundary'

import { fetchData } from '../../reducers/dataReducer'
import { StyledInput, StyledButton, Filters } from '../../styles'
import Table from './Table'
import SelectInput from '../inputs/SelectInput'
import useQueryParams from '../../hooks/useQueryParams'
import { metricTypeSelectOptions } from '../../contants'

const DataPointTable = ({ data }) => {
  const [ queryParams, handleFilterChange, handleSort ] = useQueryParams()
  const dispatch = useDispatch()
  // const handleError = useErrorHandler()

  useEffect(() => {
    dispatch(fetchData(queryParams))
  }, [queryParams])

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

  return (
    <>
      <Filters>
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
      </Filters>
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