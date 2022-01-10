import React from 'react'
import { useTable, useFilters, useSortBy, useBlockLayout } from 'react-table'
import { FixedSizeList } from 'react-window'
import { Table } from '../../styles'

const scrollbarWidth = () => {
  const scrollDiv = document.createElement('div')
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
  document.body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  document.body.removeChild(scrollDiv)
  return scrollbarWidth
}

const DataPointTable = ({ data }) => {
  const memoData = React.useMemo(() => data, [data])
  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

  const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  const columns = React.useMemo(
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
  } = useTable({ columns: columns, data: memoData, defaultColumn }, useFilters, useSortBy, useBlockLayout)

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
    <Table>
      <div {...getTableProps()} className="table">
        <div className="thead">
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
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
  )
}

export default DataPointTable