import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton } from '../../styles'
import { createFarm } from '../../reducers/farmReducer'
import { newNotification } from '../../services/notificationService'

const CreateFarmForm = ({farms}) => {
  const dispatch = useDispatch()

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

  return (
    <Formik
      initialValues={{
        farmName: '',
      }}
      validationSchema={yup.object({
        farmName: yup.string()
          .required('Required')
          .test(
            'farmName',
            'Farm with the given name already exists',
            (value) => !farms.some(farm => farm.name === value)
          )
      })}
      onSubmit={async ({farmName}) => {
        await handleFarmCreateSubmit(farmName)
      }}
    >
      <Form>
        <FormikTextInput
          label='Farm name'
          name='farmName'
          type='text'
          placeholder='Name'
        />
        <StyledButton type='submit'>Submit</StyledButton>
      </Form>
    </Formik>
  )
}

export default CreateFarmForm
