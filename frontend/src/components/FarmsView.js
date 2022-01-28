import React from 'react'
import fileService from '../services/fileService'
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../reducers/dataReducer'
import { createDataPoint } from '../reducers/dataReducer'
import { createFarm } from '../reducers/farmReducer'
import { newNotification } from '../services/notificationService'
import Togglable from './Togglable'
import FileUploadForm from './forms/FileUploadForm'
import FarmList from './lists/FarmList'
import CreateDataPointForm from './forms/CreateDataPointForm'
import CreateFarmForm from './forms/CreateFarmForm'

const FarmsView = () => {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)

  const handleUploadSubmit = async (file, farm) => {
    const response = await fileService.upload({
      file: file,
      filename: file.name,
      farmId: farm.id,
    })
    dispatch(addData(response))
    newNotification({
      message: `File ${file.name} uploaded successfully.`,
      type: 'success',
      time: 3000
    })
  }

  const handleDataPointCreateSubmit = (farm, date, type, value) => {
    dispatch(createDataPoint({
      farmId: farm.id,
      dateTime: date,
      metricType: type,
      metricValue: value
    }))
    newNotification({
      message: 'New data point added successfully.',
      type: 'success',
      time: 3000
    })
  }

  const handleFarmCreateSubmit = (farmName) => {
    dispatch(createFarm({
      name: farmName,
    }))
    newNotification({
      message: 'New farm created successfully.',
      type: 'success',
      time: 3000
    })
  }

  return (
    <div>
      <h1>Farms</h1>
      <FarmList farms={farms} />
      <Togglable buttonLabel='Create a new farm'>
        < CreateFarmForm
          farms={farms}
          handler={handleFarmCreateSubmit}
        />
      </Togglable>
      <Togglable buttonLabel='Add a single data point'>
        <CreateDataPointForm
          farms={farms}
          handler={handleDataPointCreateSubmit}
        />
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
