import React from 'react'
// import fileService from '../services/fileService'
import { useSelector } from 'react-redux'
// import { createDataPoint } from '../reducers/dataReducer'
// import { createFarm } from '../reducers/farmReducer'
// import { newNotification } from '../services/notificationService'
// import Togglable from '../components/Togglable'
// import FileUploadForm from '../components/forms/FileUploadForm'
import FarmList from '../components/lists/FarmList'
// import CreateDataPointForm from '../components/forms/CreateDataPointForm'
import CreateFarmForm from '../components/forms/CreateFarmForm'
import { useAuth } from '../contexts/AuthContext'
import { selectFarmNodes, selectUserOwnedFarmNodes } from '../reducers/farmReducer'

const MyFarmsView = () => {
  const { user } = useAuth()
  const farms = useSelector(selectFarmNodes)
  const userOwnedFarms = useSelector((state) => selectUserOwnedFarmNodes(state, user.username))
  console.log(farms)
  console.log(userOwnedFarms)

  return (
    <div>
      <h1>My farms</h1>
      <FarmList farms={userOwnedFarms} />
      <CreateFarmForm farms={farms} />
    </div>
  )
}

export default MyFarmsView
