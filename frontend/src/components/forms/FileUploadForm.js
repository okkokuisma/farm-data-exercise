import React, { useState, useRef } from 'react'
import FarmSelect from '../inputs/FarmSelect'
import { Button } from '../../styles'

const FileUploadForm = ({handler, farms}) => {
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

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
      alert('Invalid values.')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FarmSelect
          farms={farms}
          onChange={e => {
            setSelectedFarm(farms.find(farm => farm.name === e.target.value))
          }}
        />
        <Button as='label' htmlFor="file-upload" className="custom-file-upload">
            Select file
        </Button>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{display: 'none'}}
        />
        <span>{selectedFile?.name || 'No file selected'}</span>
        <Button type="submit">Upload</Button>
      </form>
    </>
  )
}

export default FileUploadForm
