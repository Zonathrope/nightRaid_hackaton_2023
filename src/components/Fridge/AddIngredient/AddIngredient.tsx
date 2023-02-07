import React, { useMemo } from 'react'
import { Ingredient } from '@/server/model'
import { Field as FField, Formik } from 'formik'
import Field from '@/components/Fridge/AddIngredient/Field'
import { ingredientInitialValues } from './helper'

import styles from './AddIngredient.module.scss'
import { useCreateIngredient } from '@/queries/ingredients'

interface AddIngredientProps {
  ingredients: Array<Ingredient>
  userId: string
}

const AddIngredient: React.FC<AddIngredientProps> = ({
  ingredients,
  userId
}) => {
  const { mutate } = useCreateIngredient()
  const typeList = useMemo(() => [...new Set(ingredients.filter(el => el.type)
  .map(el => el.type))], [ingredients])

  // TODO: typized the function
  const handleChooseName = (e, originalFunc) => {
    const value = e.target.value
    const ingredient = ingredients.find((el) => el.name === value)
    originalFunc(e)
    if (ingredient?.type) {
      originalFunc({
        target: {
          name: 'type',
          value: ingredient.type
        }
      })
    }
  }
  return (
    <div>
      <Formik
        initialValues={{
          type: typeList[0],
          name: ingredients[0].name,
          amount: ''
        }}
        onSubmit={(values, { setSubmitting }) => {
          const {
            type,
            name,
            amount
          } = values
          setSubmitting(true)
          mutate({
            typeOfIngredient: type,
            nameOfIngredient: name,
            amount,
            idInMealDB: ingredients.find((el) => el.name === name).id,
            _id: userId
          }, {
            onSuccess: () => {
              setSubmitting(false)
            }
          })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            {/* TODO: move to another component */}
            <div className={styles.selectWrapper}>
              <label className={styles.label} htmlFor='name'>Name</label>
              <FField onChange={(values) => handleChooseName(values, handleChange)} className={styles.customField}
                      as='select' name='name'>
                {ingredients.map((el) => <option key={el.name} value={el.name} label={el.name} />)}
              </FField>
            </div>
            <div className={styles.selectWrapper}>
              <label className={styles.label} htmlFor='type'>Type</label>
              <FField className={styles.customField}
                      as='select' name='type'>
                {typeList.map((el) => <option key={el} value={el} label={el} />)}
              </FField>
            </div>
            <Field errors={errors.amount} isTouched={touched.amount} onBlur={handleBlur} onChange={handleChange}
                   name={'amount'} placeholder={'amount'} value={values.amount} />
            <button className={styles.submit} type='submit'>
              Add
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AddIngredient
