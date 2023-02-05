import React from 'react'

import { Meal as IMeal } from '@/server/model'
import Img from '@/components/Search/MealCard/Img/Img'

import styles from './Meal.module.scss'

interface MealProps {
  meal: IMeal
}

const Meal: React.FC<MealProps> = ({ meal }) => {
  return (
    <div className={styles.wrapper}>
      <Img href={meal.image} />
      <div className={styles.info}>
        <div className={styles.title}>{meal.title}</div>
        <div className={styles.description}>{meal.description}</div>
      </div>
    </div>
  )
}

export default Meal
