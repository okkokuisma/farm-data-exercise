import React, { useState } from 'react'
import { Button, Field } from '../../styles'

const CreateFarmForm = ({farms, handler}) => {
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
    handler(farmName)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field
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
