import React, { useState } from 'react'
import { Button, Field } from '../../styles'
import {newNotification} from '../../services/notificationService'

const CreateFarmForm = ({farms, handler}) => {
  const [farmName, setFarmName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!farmName || /^\s*$/.test(farmName)) {
      newNotification({
        message: 'Farm name is required.',
        type: 'error',
        time: 3000
      })
      return
    }
    if (farms.some(farm => farm.name === farmName)) {
      newNotification({
        message: 'Farm with the given name already exists.',
        type: 'error',
        time: 3000
      })
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
