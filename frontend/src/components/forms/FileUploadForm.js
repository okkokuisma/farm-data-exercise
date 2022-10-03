import React, { useState, useRef } from 'react'
import SelectInput from '../inputs/SelectInput'
import { StyledButton } from '../../styles'
import { newNotification } from '../../services/notificationService'

const FileUploadForm = ({handler, farms}) => {
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const farmSelectOptions = farms.map(f => {
    return {name: f.name, value: f.id}
  })

  const validateValues = () => {
    return (typeof selectedFarm !== 'undefined' && selectedFarm !== null)
      && (typeof selectedFile !== 'undefined' && selectedFile !== null)
      && (selectedFile.type === 'text/csv')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateValues()) {
      await handler(selectedFile, selectedFarm)
      setSelectedFile(null)
      fileInputRef.current.value = ''
    } else {
      newNotification({
        message: 'Invalid values.',
        type: 'error',
        time: 3000
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SelectInput
          options={farmSelectOptions}
          onChange={e => {
            setSelectedFarm(farms.find(farm => farm.id === Number(e.target.value)))
          }}
        />
        <StyledButton as='label' htmlFor='file-upload' className='custom-file-upload'>
            Select file
        </StyledButton>
        <input
          id='file-upload'
          type='file'
          ref={fileInputRef}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{display: 'none'}}
        />
        <span>{selectedFile?.name || 'No file selected'}</span>
        <StyledButton type='submit'>Upload</StyledButton>
      </form>
    </>
  )
}

export default FileUploadForm
