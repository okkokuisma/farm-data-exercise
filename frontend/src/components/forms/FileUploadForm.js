import React, { useState, useRef } from 'react'
import { StyledButton } from '../../styles'
import { newNotification } from '../../services/notificationService'
import fileService from '../../services/fileService'

const FileUploadForm = ({farmId}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const validateValues = () => {
    return (typeof selectedFile !== 'undefined' && selectedFile !== null)
      && (selectedFile.type === 'text/csv')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateValues()) {
      await fileService.upload({
        file: selectedFile,
        filename: selectedFile.name,
        farmId
      })
      newNotification({
        message: `File ${selectedFile.name} uploaded successfully.`,
        type: 'success',
        time: 3000
      })
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
