import React from 'react'
import { Formik } from 'formik'
import Field from '@/components/Fridge/AddIngredient/Field'
import { ingredientInitialValues, validation } from './helper'

import styles from './AddIngredient.module.scss'

const AddIngredient = () => {
  return (
    <div>
      <Formik
        initialValues={ingredientInitialValues}
        validate={validation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
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
            <Field errors={errors.name} isTouched={touched.name} onBlur={handleBlur} onChange={handleChange}
                   name={'name'} placeholder={'name'} value={values.name} />
            <Field errors={errors.amount} isTouched={touched.amount} onBlur={handleBlur} onChange={handleChange}
                   name={'amount'} placeholder={'amount'} value={values.amount} />
            <Field errors={errors.type} isTouched={touched.type} onBlur={handleBlur} onChange={handleChange}
                   name={'type'} placeholder={'type'} value={values.type} />
            <button className={styles.submit} type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddIngredient
