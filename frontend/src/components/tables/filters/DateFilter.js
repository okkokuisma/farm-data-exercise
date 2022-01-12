import React from 'react'
// import { Table, Select } from '../../styles'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(minMax)
dayjs.extend(isBetween)

export const DateFilter = ({
  column: { filterValue = [], setFilter, preFilteredRows, id },
}) => {
  const dates = preFilteredRows.map(row => dayjs(row.values[id]))
  const minDate = dayjs.min(dates)
  const maxDate = dayjs.max(dates)
  return (
    <div>
      <input
        value={filterValue[0] || ''}
        type='date'
        min={minDate.toDate()}
        onChange={e => {
          const val = e.target.value
          console.log(e.target.value)
          setFilter((old = []) => [val ? (val) : undefined, old[1]])
        }}
        style={{
          width: '170px',
          marginRight: '0.5rem'
        }}
      />
      <input
        value={filterValue[1] || ''}
        type='date'
        max={maxDate.toDate()}
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? (val) : undefined])
        }}
        style={{
          width: '170px',
          marginLeft: '0.5rem'
        }}
      />
    </div>
  )
}

export const filterDateBetween = (rows, id, filterValue) => {
  return rows.filter(row => {
    return dayjs(row.values[id]).isBetween(filterValue[0], filterValue[1])
  })
}