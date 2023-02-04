import React from 'react'
import { Meal } from '@/types'
import Img from '@/components/Search/MealCard/Img/Img'

const MealCard = (meal: Meal) => {
  return (
    <div>
      <Img href={meal.image} preview />
      <div>{meal.title}</div>
      <div>{meal.description}</div>
    </div>
  )
}

export default MealCard
