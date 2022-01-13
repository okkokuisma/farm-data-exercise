import React, { useState, useRef } from 'react'
import fileService from '../services/fileService'
import farmService from '../services/farmService'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from '../styles'
import { addData } from '../reducers/dataReducer'
import { createFarm, deleteFarm } from '../reducers/farmReducer'
import { FixedSizeList } from 'react-window'

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

  const handleDelete = async (id) => {
    console.log(id)
    farmService.deleteFarm(id)
    dispatch(deleteFarm(id))
  }

  const Row = ({ index, style }) => {
    const farm = farms[index]
    return (
      <ListItem style={style}>
        {farm.name}
        <button onClick={() => handleDelete(farm.id)} className='delete'>delete</button>
      </ListItem>
    )
  }

  return (
    <div style={{padding: '50px 0px'}}>
      <FixedSizeList
        height={100}
        itemCount={farms.length}
        itemSize={35}
        width={1000}
      >
        {Row}
      </FixedSizeList>
      <form onSubmit={handleSubmit} style={{padding: '50px 0px'}}>
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
    </div>
  )
}

export default FarmsView
