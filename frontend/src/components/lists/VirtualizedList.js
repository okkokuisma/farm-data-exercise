import React from 'react'
import { FixedSizeList } from 'react-window'


const VirtualizedList = ({row, height, itemCount, itemSize, width}) => {
  return (
    <>
      <FixedSizeList
        height={height}
        itemCount={itemCount}
        itemSize={itemSize}
        width={width}
      >
        {row}
      </FixedSizeList>
    </>
  )
}

export default VirtualizedList
