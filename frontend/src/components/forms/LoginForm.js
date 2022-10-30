import React from 'react'
import { Formik, Form } from 'formik'

import FormikTextInput from '../inputs/FormikTextInput'
import { StyledButton, StyledForm, StyledFormDiv } from '../../styles'

const LoginForm = ({ handler }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async ({username, password}) => handler(username, password)}
    >
      <Form>
        <StyledFormDiv>
          <StyledForm>
            <h2 className='header'>Login</h2>
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
            <StyledButton className='submit' type='submit'>Sign in</StyledButton>
          </StyledForm>
        </StyledFormDiv>
      </Form>
    </Formik>
  )
}

export default LoginForm