import React, { useEffect } from 'react'
import fileService from '../services/fileService'
import { useSelector, useDispatch } from 'react-redux'
import { addData } from '../reducers/dataReducer'
import { createDataPoint } from '../reducers/dataReducer'
import { createFarm, deleteFarm, initFarms } from '../reducers/farmReducer'
import { newNotification } from '../services/notificationService'
import Togglable from '../components/Togglable'
import FileUploadForm from '../components/forms/FileUploadForm'
import FarmList from '../components/lists/FarmList'
import CreateDataPointForm from '../components/forms/CreateDataPointForm'
import CreateFarmForm from '../components/forms/CreateFarmForm'

const FarmsView = () => {
  const dispatch = useDispatch()
  const farms = useSelector(state => state.farms)

  useEffect(() => {
    dispatch(initFarms())
  }, [])

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

  const handleFarmCreateSubmit = async (farmName) => {
    try {
      await dispatch(createFarm({
        name: farmName,
      }))
      newNotification({
        message: 'New farm created successfully.',
        type: 'success',
        time: 3000
      })
    } catch (error) {
      newNotification({
        message: 'Error while creating a new farm.',
        type: 'error',
        time: 3000
      })
    }
  }

  const handleFarmDelete = async (id) => {
    dispatch(deleteFarm(id))
  }

  return (
    <div>
      <h1>Farms</h1>
      <FarmList farms={farms} handleDelete={handleFarmDelete} />
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
