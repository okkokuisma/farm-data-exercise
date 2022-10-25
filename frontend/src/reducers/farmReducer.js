import farmService from '../services/farmService'

export const createFarm = (farm) => {
  return (dispatch) => {
    return farmService.create(farm)
      .then((farm) => {
        dispatch({
          type: 'CREATE_FARM',
          data: farm
        })
      })
  }
  // return async (dispatch) => {
  //   try {
  //     const createdFarm = await farmService.create(farm)
  //     dispatch({
  //       type: 'CREATE_FARM',
  //       data: createdFarm
  //     })
  //     dispatch(createNotification({
  //       message: 'New farm created successfully.',
  //       type: 'success',
  //       time: 3000
  //     }))
  //   } catch (error) {
  //     if (error?.response?.status === 401) {
  //       dispatch(logout())
  //       dispatch(createNotification({
  //         message: 'Your session timed out. Please log in again.',
  //         type: 'info',
  //         time: 3000
  //       }))
  //     } else {
  //       dispatch(createNotification({
  //         message: 'Error while creating a new farm.',
  //         type: 'error',
  //         time: 3000
  //       }))
  //     }
  //   }
  // }
}

export const deleteFarm = (farmId) => {
  return (dispatch) => {
    return farmService.deleteFarm(farmId)
      .then(() => {
        return dispatch({
          type: 'DELETE_FARM',
          data: farmId
        })
      })
  }
}

export const initFarms = (queryParams) => {
  return (dispatch) => {
    return farmService.getAll(queryParams)
      .then((farms) => {
        dispatch({
          type: 'INIT_FARMS',
          data: farms
        })
      })
  }
}

export const selectFarmNodes = state => state.farms
export const selectUserOwnedFarmNodes = (state, username) => {
  return state.farms
    .filter(f => f?.user?.username === username)
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_FARMS':
    return action.data
  case 'CREATE_FARM':
    console.log([ ...state, action.data ])
    return [ ...state, action.data ]
  case 'DELETE_FARM':
    console.log(state)
    return state.filter(farm => farm.id !== action.data)
  default:
    return state
  }
}

export default reducer