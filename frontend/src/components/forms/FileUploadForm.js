import React, { useState, useRef } from 'react'

const FileUploadForm = ({handler}) => {
  const [inputName, setInputName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handler(selectedFile, inputName)

    setInputName('')
    setSelectedFile(null)
    fileInputRef.current.value = ''
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
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

export default FileUploadForm
