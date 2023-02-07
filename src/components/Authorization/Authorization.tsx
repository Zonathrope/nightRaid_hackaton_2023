import React, { useState } from 'react'
import { Formik } from 'formik'
import Field from '@/components/Fridge/AddIngredient/Field'
import styles from '@/components/Fridge/AddIngredient/AddIngredient.module.scss'
import { initialValues, validation } from '@/components/Authorization/helper'
import classnames from 'classnames'
import { useAuthorize } from '@/queries/user'
import { useRouter } from 'next/router'

const Authorization = () => {
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()
  const { mutate, isError, error } = useAuthorize()
  const { response: { data: { errorMessage } } } = error || { response: { data: { errorMessage: '' } } }
  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const { login, password } = values
          mutate({
            login: login || '',
            password: password || '',
            isRegister
          }, {
            onSuccess: () => {
              router.push('/')
            }
          })
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Field errors={errors.login} isTouched={touched.login} onBlur={handleBlur} onChange={handleChange}
                   name={'login'} placeholder={'login'} value={values.login} />
            <Field errors={errors.password} isTouched={touched.password} onBlur={handleBlur} onChange={handleChange}
                   name={'password'} type='password' placeholder={'password'} value={values.password} />
            <div className={styles.error}>
              {isError && errorMessage}
            </div>
            <div className={styles.buttons}>
              <button className={classnames(styles.submit, styles.register)}
                      onClick={() => setIsRegister((prev) => !prev)}
                      type='button'>{isRegister ? 'Login' : 'Register'}</button>
              <button className={styles.submit} type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Authorization
