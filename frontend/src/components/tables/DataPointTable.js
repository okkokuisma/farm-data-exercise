import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTable, useFilters, useSortBy, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Table, Filters } from '../../styles'
import { DateFilter, filterDateBetween} from './filters/DateFilter'
import SelectColumnFilter from './filters/SelectColumnFilter'
import { filterData } from '../../reducers/filteredDataReducer'

const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

const DataPointTable = ({ data }) => {
  const dispatch = useDispatch()
  const memoData = React.useMemo(() => data, [data])
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

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

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

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
            <FixedSizeList
              height={400}
              itemCount={rows.length}
              itemSize={35}
              width={totalColumnsWidth+scrollBarSize}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      </Table>
    </>
  )
}

export default DataPointTable