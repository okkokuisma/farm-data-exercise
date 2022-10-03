import React from 'react'
import { useField } from 'formik'

import SelectInput from './SelectInput'
import { StyledFormError, StyledFormInput } from '../../styles'

const FormikSelectInput = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <StyledFormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <SelectInput {...field} {...props} options={options} />
      </StyledFormInput>
      {meta.touched && meta.error ? (
        <StyledFormError>{meta.error}</StyledFormError>
      ) : null}
    </>
  )
}

export default FormikSelectInput