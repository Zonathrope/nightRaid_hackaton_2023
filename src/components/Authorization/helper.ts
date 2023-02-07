interface AuthorizationValues {
  login?: string
  password?: string
}

export const initialValues: AuthorizationValues = {
  login: '',
  password: ''
}

export const required = (value: string | undefined): 'Required' | undefined => {
  return value ? undefined : 'Required'
}

export const validation = (values: AuthorizationValues) => {
  const errors: AuthorizationValues = {}

  errors.login = required(values.login)
  errors.password = required(values.password)
  return errors
}
