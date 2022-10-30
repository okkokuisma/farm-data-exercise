import React, { useState, useRef } from 'react'
import { newNotification } from '../../services/notificationService'
import fileService from '../../services/fileService'
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormDiv
} from '../../styles'

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
        <StyledFormDiv>
          <StyledForm>
            <h2 className='header'>Add data points by a csv file</h2>
            <StyledFormInput>
              <StyledButton as='label' htmlFor='file-upload'>
                  Select file
              </StyledButton>
              <input
                id='file-upload'
                type='file'
                ref={fileInputRef}
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{display: 'none'}}
              />
              <span as='label'>{selectedFile?.name || 'No file selected'}</span>
            </StyledFormInput>
            <StyledButton className='submit' type='submit'>Upload</StyledButton>
          </StyledForm>
        </StyledFormDiv>
      </form>
    </>
  )
}

export default FileUploadForm
