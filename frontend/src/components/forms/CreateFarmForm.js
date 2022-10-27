import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton, StyledForm } from '../../styles'
import { createFarm } from '../../reducers/farmReducer'
import { createNotification } from '../../reducers/notificationReducer'
import useErrorHandler from '../../hooks/useErrorHandler'

const CreateFarmForm = ({farms}) => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  const handleFarmCreateSubmit = async (values) => {
    dispatch(createFarm(values))
      .then(() => {
        dispatch(createNotification({
          message: 'New farm created successfully.',
          type: 'success',
          time: 3000
        }))
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleError(error)
        } else {
          dispatch(createNotification({
            message: 'Error while creating a new farm.',
            type: 'error',
            time: 3000
          }))
        }
      })
  }

  return (
    <Formik
      initialValues={{
        name: '',
        city: '',
        address: ''
      }}
      validationSchema={yup.object({
        name: yup.string()
          .required('Required')
          .test(
            'farmName',
            'Farm with the given name already exists',
            (value) => !farms.some(farm => farm.name === value)
          ),
        city: yup.string()
          .required(),
        address: yup.string()
          .required()
      })}
      onSubmit={async (values) => {
        await handleFarmCreateSubmit(values)
      }}
    >
      <Form>
        <StyledForm>
          <h2 className='header'>Create a new farm</h2>
          <FormikTextInput
            label='Farm name'
            name='name'
            type='text'
            placeholder='Name'
          />
          <FormikTextInput
            label='City'
            name='city'
            type='text'
            placeholder='City'
          />
          <FormikTextInput
            label='Address'
            name='address'
            type='text'
            placeholder='Address'
          />
          <StyledButton className='submit' type='submit'>Submit</StyledButton>
        </StyledForm>
      </Form>
    </Formik>
  )
}

export default CreateFarmForm
