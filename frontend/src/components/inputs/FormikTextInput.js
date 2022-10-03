import React from 'react'
import { useField } from 'formik'

import { StyledInput, StyledFormError, StyledFormInput } from '../../styles'

const FormikTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <StyledFormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <StyledInput {...field} {...props} />
      </StyledFormInput>
      {meta.touched && meta.error ? (
        <StyledFormError>{meta.error}</StyledFormError>
      ) : null}
    </>
  )
}

export default FormikTextInput