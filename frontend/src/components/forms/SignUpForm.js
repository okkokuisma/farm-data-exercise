import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton, StyledForm, StyledFormError, StyledFormDiv, StyledFormErrorDiv } from '../../styles'

const SignUpForm = ({ handler }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={yup.object({
        password: yup.string()
          .required('Password required')
          .matches(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
            'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          ),
        username: yup.string()
          .required('Username required')
      })}
      onSubmit={async (values, { resetForm }) => {
        await handler(values)
        resetForm()
      }}
    >
      <Form>
        <StyledFormDiv>
          <StyledForm>
            <h2 className='header'>...or sign up</h2>
            <FormikTextInput
              name='username'
              type='text'
              placeholder='Username'
              label='Username'
            />

            <FormikTextInput
              name='password'
              type='password'
              placeholder='Password'
              label='Password'
            />
            <StyledButton className='submit' type='submit'>Sign up</StyledButton>
          </StyledForm>
          <StyledFormErrorDiv>
            <ErrorMessage name='username' component={StyledFormError} />
            <ErrorMessage name='password' component={StyledFormError} />
          </StyledFormErrorDiv>
        </StyledFormDiv>
      </Form>
    </Formik>
  )
}

export default SignUpForm