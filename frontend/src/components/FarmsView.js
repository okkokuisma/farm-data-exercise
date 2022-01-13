import React from 'react'
import fileService from '../services/fileService'
import { useSelector, useDispatch } from 'react-redux'
// import { ListItem } from '../styles'
import { addData } from '../reducers/dataReducer'
import { createFarm } from '../reducers/farmReducer'
import Togglable from './Togglable'
import FileUploadForm from './forms/FileUploadForm'
import FarmList from './lists/FarmList'
import CreateDataPointForm from './forms/CreateDataPointForm'

const FarmsView = () => {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)

  const handleUploadSubmit = async (file, farmName) => {
    if (!farmName || /^\s*$/.test(farmName)) {
      alert('Farm name is required.')
      return
    }
    if (farms.some(farm => farm.name === farmName)) {
      alert('Farm with the given name already exists.')
      return
    }
    if (!file || !file.type || !file.type === 'text/csv') {
      alert('Only csv type files allowed.')
      return
    }

    const response = await fileService.upload({
      file: file,
      filename: file.name,
      farmName: farmName,
    })

    dispatch(addData(response))
    if (response[0].farm) dispatch(createFarm(response[0].farm))
  }

  return (
    <div style={{padding: '50px 0px'}}>
      <h1>Farms</h1>
      <FarmList farms={farms} />
      <Togglable buttonLabel='Upload new farm data'>
        <FileUploadForm handler={handleUploadSubmit} />
      </Togglable>
      <Togglable buttonLabel='Add a data point'>
        <CreateDataPointForm farms={farms} />
      </Togglable>
    </div>
  )
}

export default FarmsView
