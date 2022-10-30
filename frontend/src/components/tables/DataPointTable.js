import React from 'react'
import { Link } from 'react-router-dom'

import { StyledButton, Filters } from '../../styles'
import Table from './Table'
import DateFilter from '../filters/DateFilter'
import MetricTypeFilter from '../filters/MetricTypeFilter'
import FarmSearchFilter from '../filters/FarmSearchFilter'

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
      <Filters>
        <FarmSearchFilter handleFilterChange={handleFilterChange} />
        <MetricTypeFilter handleFilterChange={handleFilterChange} />
        <DateFilter handleFilterChange={handleFilterChange} />
      </Filters>
      <Table rows={tableRows} headers={tableHeaders} />
      <Filters>
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
      </Filters>
    </>
  )
}

export default DataPointTable