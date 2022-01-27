import React from 'react'
import fileService from '../services/fileService'
import { useSelector, useDispatch } from 'react-redux'
// import { ListItem } from '../styles'
import { addData } from '../reducers/dataReducer'
import Togglable from './Togglable'
import FileUploadForm from './forms/FileUploadForm'
import FarmList from './lists/FarmList'
import CreateDataPointForm from './forms/CreateDataPointForm'
import CreateFarmForm from './forms/CreateFarmForm'

const FarmsView = () => {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)

  const handleUploadSubmit = async (file, farm) => {
    if (!file || !file.type || file.type !== 'text/csv') {
      alert('Only csv type files allowed.')
      return
    }

    const response = await fileService.upload({
      file: file,
      filename: file.name,
      farmId: farm.id,
    })

    dispatch(addData(response))
  }

  return (
    <div style={{padding: '50px 0px'}}>
      <h1>Farms</h1>
      <FarmList farms={farms} />
      <Togglable buttonLabel='Create a new farm'>
        < CreateFarmForm farms={farms} />
      </Togglable>
      <Togglable buttonLabel='Add a single data point'>
        <CreateDataPointForm farms={farms} />
      </Togglable>
      <Togglable buttonLabel='Upload a csv file'>
        <FileUploadForm
          farms={farms}
          handler={handleUploadSubmit}
        />
      </Togglable>
    </div>
  )
}

export default FarmsView
