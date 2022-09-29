import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import FormikTextInput from '../inputs/FormikTextInput'
import { Button } from '../../styles'

const LoginForm = ({ handler }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={yup.object({
        password: yup.string()
          .required('Required')
          .matches(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
            'Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          ),
        username: yup.string()
          .required('Required')
      })}
      onSubmit={async ({username, password}) => handler(username, password)}
    >
      <Form>
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
        <Button type='submit'>Sign in</Button>
      </Form>
    </Formik>
  )
}

export default LoginForm