import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton } from '../../styles'

const CreateFarmForm = ({farms, handler}) => {
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
        await handler(farmName)
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
