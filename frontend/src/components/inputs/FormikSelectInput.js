import React from 'react'
import { useField } from 'formik'

import SelectInput from './SelectInput'
import { FormError, FormInput } from '../../styles'

const FormikSelectInput = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <FormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <SelectInput {...field} {...props} options={options} />
      </FormInput>
      {meta.touched && meta.error ? (
        <FormError>{meta.error}</FormError>
      ) : null}
    </>
  )
}

export default FormikSelectInput