import React from 'react'
import dayjs from 'dayjs'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

import FormikTextInput from '../inputs/FormikTextInput'
import FormikSelectInput from '../inputs/FormikSelectInput'
import { StyledButton } from '../../styles'
import { newNotification } from '../../services/notificationService'
import { createDataPoint } from '../../reducers/dataReducer'

const CreateDataPointForm = ({ farmId }) => {
  const dispatch = useDispatch()

  const handleDataPointCreateSubmit = (values) => {
    console.log(values)
    dispatch(createDataPoint(values))
    newNotification({
      message: 'New data point added successfully.',
      type: 'success',
      time: 3000
    })
  }

  const metricTypeSelectOptions = [
    {name: 'Rain fall', value: 'rainFall'},
    {name: 'Temperature', value: 'temperature'},
    {name: 'pH', value: 'pH'},
  ]

  return (
    <>
      <Formik
        initialValues={{
          dateTime: dayjs(Date()).format('YYYY-MM-DDTHH:mm'),
          metricType: 'rainFall',
          metricValue: 0,
        }}
        validationSchema={yup.object({
          dateTime: yup.date()
            .required('Required'),
          metricType: yup.string()
            .required('Required'),
          metricValue: yup.number()
            .when('metricType', {
              is: (val) => val === 'rainFall',
              then: yup.number().min(0).max(500),
            })
            .when('metricType', {
              is: (val) => val === 'pH',
              then: yup.number().min(0).max(14),
            })
            .when('metricType', {
              is: (val) => val === 'temperature',
              then: yup.number().min(-50).max(100),
            })
            .required('Required')
        })}
        onSubmit={async ({values}) => {
          await handleDataPointCreateSubmit({farmId, ...values})
        }}
      >
        <Form>
          <FormikTextInput
            label='Date'
            name='dateTime'
            type='datetime-local'
            placeholder='Date and time'
          />

          <FormikTextInput
            label='Metric Value'
            name='metricValue'
            type='number'
          />

          <FormikSelectInput
            label='Metric type'
            name='metricType'
            options={metricTypeSelectOptions}
          />

          <StyledButton type='submit'>Submit</StyledButton>
        </Form>
      </Formik>
    </>
  )
}

export default CreateDataPointForm
