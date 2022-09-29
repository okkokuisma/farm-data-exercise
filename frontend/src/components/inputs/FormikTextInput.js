import React from 'react'
import { useField } from 'formik'

import { Field, FormError, FormInput } from '../../styles'

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <FormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Field {...field} {...props} />
      </FormInput>
      {meta.touched && meta.error ? (
        <FormError>{meta.error}</FormError>
      ) : null}
    </>
  )
}

export default FormikTextInput