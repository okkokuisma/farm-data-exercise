import { useState } from 'react'

const useQueryParams = () => {
  const [ queryParams, setQueryParams ] = useState({})

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

  const handleSort = (header) => {
    const { asc, order_by, ...otherParams } = queryParams
    let sortValues = {}
    if (order_by === header) {
      sortValues = asc === 'false'
        ? {asc: 'true', order_by: header}
        : {}
    } else {
      sortValues = {asc: 'false', order_by: header}
    }
    console.log(sortValues)
    setQueryParams({...otherParams, ...sortValues})
  }

  return [ queryParams, handleFilterChange, handleSort ]
}

export default useQueryParams