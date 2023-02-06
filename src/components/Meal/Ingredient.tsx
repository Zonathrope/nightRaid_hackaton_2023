import React from 'react'
import { Ingredient as IIngredient } from '@/server/model'

import styles from './Meal.module.scss'

interface IngredientProps {
  ingredient: IIngredient
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient }) => {
  const {
    name,
    amount
  } = ingredient
  return (
    <div className={styles.ingredientWrapper}>
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.amount}>
        {amount}
      </div>
    </div>
  )
}

export default Ingredient
