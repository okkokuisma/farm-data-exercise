import React from 'react'
import dayjs from 'dayjs'
import { Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

import FormikTextInput from '../inputs/FormikTextInput'
import FormikSelectInput from '../inputs/FormikSelectInput'
import { createNotification } from '../../reducers/notificationReducer'
import { createDataPoint } from '../../reducers/dataReducer'
import useErrorHandler from '../../hooks/useErrorHandler'
import {
  StyledButton,
  StyledForm,
  StyledFormDiv,
  StyledFormError,
  StyledFormErrorDiv
} from '../../styles'

const CreateDataPointForm = ({ farmId }) => {
  const dispatch = useDispatch()
  const handleError = useErrorHandler()

  const handleDataPointCreateSubmit = (values) => {
    dispatch(createDataPoint(values))
      .then(() => {
        dispatch(createNotification({
          message: 'New data point added successfully.',
          type: 'success',
          time: 3000
        }))
      })
      .catch((error) => handleError(error))
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
            .required('Date required'),
          metricType: yup.string()
            .required('Metric type required'),
          metricValue: yup.number()
            .when('metricType', {
              is: (val) => val === 'rainFall',
              then: yup.number()
                .min(0, 'Metric value for rainfall must be at minimum 0')
                .max(500, 'Metric value for rainfall can be at maximum 500')
            })
            .when('metricType', {
              is: (val) => val === 'pH',
              then: yup.number()
                .min(0, 'Metric value for pH must be at minimum 0')
                .max(14, 'Metric value for pH can be at maximum 14'),
            })
            .when('metricType', {
              is: (val) => val === 'temperature',
              then: yup.number()
                .min(-50, 'Metric value for temperature must be at minimum -50')
                .max(100, 'Metric value for temperature can be at maximum 100'),
            })
            .required('Metric value required')
        })}
        onSubmit={async (values) => {
          handleDataPointCreateSubmit({farmId, ...values})
        }}
      >
        <Form>
          <StyledFormDiv>
            <StyledForm>
              <h2 className='header'>Add a data point</h2>
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
            </StyledForm>
            <StyledFormErrorDiv>
              <ErrorMessage name='dateTime' component={StyledFormError} />
              <ErrorMessage name='metricValue' component={StyledFormError} />
              <ErrorMessage name='metricType' component={StyledFormError} />
            </StyledFormErrorDiv>
          </StyledFormDiv>
        </Form>
      </Formik>
    </>
  )
}

export default CreateDataPointForm
