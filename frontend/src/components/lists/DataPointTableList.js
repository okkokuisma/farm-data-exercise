import React from 'react'
import VirtualizedList from './VirtualizedList'


const DataPointTableList = ({prepareRow, rows, totalColumnsWidth}) => {

  const scrollbarWidth = () => {
    const scrollDiv = document.createElement('div')
    scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }

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

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

  return (
    <>
      <VirtualizedList
        row={RenderRow}
        height={400}
        itemCount={rows.length}
        itemSize={35}
        width={totalColumnsWidth+scrollBarSize}
      />
    </>
  )
}

export default DataPointTableList
