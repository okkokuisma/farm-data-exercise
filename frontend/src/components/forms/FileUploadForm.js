import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { createNotification } from '../../reducers/notificationReducer'
import fileService from '../../services/fileService'
import useErrorHandler from '../../hooks/useErrorHandler'
import {
  StyledButton,
  StyledForm,
  StyledFormInput,
  StyledFormDiv,
  StyledFormErrorDiv,
  StyledFormError
} from '../../styles'

const FileUploadForm = ({farmId}) => {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const handleError = useErrorHandler()

  useEffect(() => {
    if (selectedFile && selectedFile.type !== 'text/csv') {
      setError('Selected file must be a CSV type file')
    } else {
      setError(null)
    }
  }, [selectedFile])

  const validateValues = () => {
    return (typeof selectedFile !== 'undefined' && selectedFile !== null)
      && (selectedFile.type === 'text/csv')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateValues()) {
      dispatch(createNotification({
        message: `Uploading file ${selectedFile.name}...`,
        type: 'info',
        time: 3000
      }))
      try {
        await fileService.upload({
          file: selectedFile,
          filename: selectedFile.name,
          farmId
        })
        dispatch(createNotification({
          message: `File ${selectedFile.name} uploaded successfully.`,
          type: 'success',
          time: 3000
        }))
      } catch (error) {
        handleError(error)
      }
      setSelectedFile(null)
      fileInputRef.current.value = ''
    } else {
      dispatch(createNotification({
        message: 'Invalid values.',
        type: 'error',
        time: 3000
      }))
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
          <StyledFormErrorDiv>
            {error
              ? <StyledFormError>{error}</StyledFormError>
              : null
            }
          </StyledFormErrorDiv>
        </StyledFormDiv>
      </form>
    </>
  )
}

export default FileUploadForm
