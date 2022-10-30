import React  from 'react'
import { useField } from 'formik'

import { StyledInput, StyledFormInput } from '../../styles'

const FormikTextInput = ({ label, ...props }) => {
  const [field] = useField(props)

  return (
    <>
      <StyledFormInput>
        <label htmlFor={props.id || props.name}>{label}</label>
        <StyledInput {...field} {...props} />
      </StyledFormInput>
    </>
  )
}

export default FormikTextInput