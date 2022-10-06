import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton } from '../../styles'
import { createFarm } from '../../reducers/farmReducer'

const CreateFarmForm = ({farms}) => {
  const dispatch = useDispatch()

  const handleFarmCreateSubmit = async (values) => {
    dispatch(createFarm(values))
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
        <StyledButton type='submit'>Submit</StyledButton>
      </Form>
    </Formik>
  )
}

export default CreateFarmForm
