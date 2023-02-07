import React, { useMemo } from 'react'
import { useGetMealsByIngredients } from '@/queries/meals'
import { useGetUserIngredients } from '@/queries/ingredients'
import MealCard from '@/components/Search/MealCard/MealCard'

import styles from './Suggestions.module.scss'
import { Meal } from '@/server/model'

interface SuggestionsProps {
  ingredient: string
}
const Suggestions: React.FC<SuggestionsProps> = ({ ingredient }) => {
  const { data, isLoading } = useGetMealsByIngredients(ingredient)
  if (isLoading) {
    return null
  }
  return (
    <div className={styles.cardList}>
      {isLoading ? <>Loading</> : (data || []).map((el: Meal) => <MealCard key={el.id} {...el}/>)}
    </div>
  )
}

export default Suggestions
