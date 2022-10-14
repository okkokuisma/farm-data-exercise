import React from 'react'
import { Link } from 'react-router-dom'

import { StyledButton } from '../../styles'
import Table from './Table'

const DataPointTable = ({ data, handleFilterChange, handleSort }) => {
  if (!data.edges || data.edges.length === 0) return null

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