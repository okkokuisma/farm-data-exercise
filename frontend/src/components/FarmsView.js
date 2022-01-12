import React, { useState, useRef } from 'react'
import fileService from '../services/fileService'
import { useSelector, useDispatch } from 'react-redux'
import { List } from '../styles'
import { addData } from '../reducers/dataReducer'
import { createFarm } from '../reducers/farmReducer'

const FarmsView = () => {
  const dispatch = useDispatch()
  const [farmName, setFarmName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)
  const farms = useSelector(state => state.farms)

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

    if (!selectedFile || !selectedFile.type || !selectedFile.type === 'text/csv') {
      alert('Only csv type files allowed.')
      return
    }

    const response = await fileService.upload({
      file: selectedFile,
      filename: selectedFile.name,
      farmName: farmName,
    })

    dispatch(addData(response))
    if (response[0].farm) dispatch(createFarm(response[0].farm))

    setFarmName('')
    setSelectedFile(null)
    fileInputRef.current.value = ''
  }

  return (
    <>
      <List>
        {farms.map(farm => (
          <li key={farm.id}>{farm.name}</li>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
        />

        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </>
  )
}

export default FarmsView
