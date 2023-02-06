import React from 'react'

import { Ingredient, Meal as IMeal } from '@/server/model'
import Img from '@/components/Search/MealCard/Img/Img'
import IngredientComponent from './Ingredient'

import styles from './Meal.module.scss'

interface CustomMeal {
  ingredients: Array<Ingredient>
  instructions: string
}

interface MealProps {
  meal: IMeal & CustomMeal
}

const Meal: React.FC<MealProps> = ({ meal }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <Img href={meal.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {meal.title}
        </div>
        <div className={styles.description}>
          {meal.description}
        </div>
        <div className={styles.instructions}>
          {meal.instructions}
        </div>
        <div className={styles.ingredients}>
          Ingredients:
          {meal.ingredients.map((el) => <IngredientComponent key={el.name} ingredient={el} />)}
        </div>
      </div>
    </div>
  )
}

export default Meal
