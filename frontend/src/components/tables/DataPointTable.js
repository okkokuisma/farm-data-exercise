import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTable, useFilters, useSortBy, useBlockLayout } from 'react-table'
import { Table, Filters } from '../../styles'
import { DateFilter, filterDateBetween } from './filters/DateFilter'
import SelectColumnFilter from './filters/SelectColumnFilter'
import { filterData } from '../../reducers/filteredDataReducer'
import DataPointTableList from '../lists/DataPointTableList'

const DataPointTable = ({ data }) => {
  const dispatch = useDispatch()
  const memoData = React.useMemo(() => data, [data])

  const tableColumns = React.useMemo(
    () => [
      {
        Header: 'Farm',
        accessor: 'farm.name',
        width: 300,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Date',
        accessor: 'dateTime',
        width: 300,
        Filter: DateFilter,
        filter: filterDateBetween,
      },
      {
        Header: 'Metric type',
        accessor: 'metricType',
        width: 300,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Metric value',
        accessor: 'metricValue',
        width: 300,
      },
    ],
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      Filter: () => null,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    columns,
    filteredRows
  } = useTable({ columns: tableColumns, data: memoData, defaultColumn }, useFilters, useSortBy, useBlockLayout)

  useEffect(() => {
    const filteredData = filteredRows.map(row => row.original)
    dispatch(filterData(filteredData))
  }, [filteredRows])

  return (
    <>
      <Filters>
        {columns[0].render('Filter')}
        {columns[2].render('Filter')}
        {columns[1].render('Filter')}
      </Filters>
      <Table>
        <div {...getTableProps()} className="table">
          <div className="thead">
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            <DataPointTableList
              prepareRow={prepareRow}
              rows={rows}
              totalColumnsWidth={totalColumnsWidth}
            />
          </div>
        </div>
      </Table>
    </>
  )
}

export default DataPointTable