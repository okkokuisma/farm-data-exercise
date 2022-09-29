import React from 'react'
import dayjs from 'dayjs'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import FormikTextInput from '../inputs/FormikTextInput'
import FormikSelectInput from '../inputs/FormikSelectInput'
import { Button } from '../../styles'

const CreateDataPointForm = ({farms, handler}) => {
  const metricTypeSelectOptions = [
    {name: 'Rain fall', value: 'rainFall'},
    {name: 'Temperature', value: 'temperature'},
    {name: 'pH', value: 'pH'},
  ]

  const farmSelectObjects = farms.map(f => {
    return {name: f.name, value: f.id}
  })
  const farmSelectOptions = farmSelectObjects.concat({name: 'Select farm', value: ''})

  return (
    <>
      <Formik
        initialValues={{
          farmId: '',
          dateTime: dayjs(Date()).format('YYYY-MM-DDTHH:mm'),
          metricType: 'rainFall',
          metricValue: 0,
        }}
        validationSchema={yup.object({
          farmId: yup.string()
            .required('Required'),
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
        onSubmit={async ({farmId, ...values}) => {
          await handler({farmId: Number(farmId), ...values})
        }}
      >
        <Form>
          <FormikSelectInput
            label='Farm'
            name='farmId'
            options={farmSelectOptions}
          />

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

          <Button type='submit'>Submit</Button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateDataPointForm
