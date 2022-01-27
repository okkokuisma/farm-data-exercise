import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createFarm } from '../../reducers/farmReducer'
import { Button } from '../../styles'

const CreateFarmForm = ({farms}) => {
  const dispatch = useDispatch()
  const [farmName, setFarmName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!farmName || /^\s*$/.test(farmName)) {
      alert('Farm name is required.')
      return
    }
    if (farms.some(farm => farm.name === farmName)) {
      alert('Farm with the given name already exists.')
      return
    }
    dispatch(createFarm({
      name: farmName,
    }))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={farmName}
          placeholder='Farm name'
          onChange={(e) => setFarmName(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  )
}

export default CreateFarmForm
