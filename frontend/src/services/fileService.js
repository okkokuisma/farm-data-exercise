import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/files'

export const upload = async (attributes) => {
  const formData = new FormData()
  Object.keys(attributes).forEach(key => {
    formData.append(key, attributes[key])
  })

  const response = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const exportedObject =  { upload }

export default exportedObject