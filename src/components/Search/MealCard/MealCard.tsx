import React from 'react'
import { Meal } from '@/server/model'
import Img from '@/components/Search/MealCard/Img/Img'

import styles from './MealCard.module.scss'

const MealCard = (meal: Meal) => {
  return (
    <a href={`/search/${meal.id}`} className={styles.card}>
      <Img href={meal.image} preview/>
      <div className={styles.title}>{meal.title}</div>
      <div className={styles.description}>{meal.description}</div>
    </a>
  )
}

export default MealCard
