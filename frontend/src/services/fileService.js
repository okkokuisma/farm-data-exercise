import axiosInstance from './axiosConfig'

export const upload = async (attributes) => {
  const formData = new FormData()
  Object.keys(attributes).forEach(key => {
    formData.append(key, attributes[key])
  })

  const response = await axiosInstance.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const exportedObject =  { upload }

export default exportedObject