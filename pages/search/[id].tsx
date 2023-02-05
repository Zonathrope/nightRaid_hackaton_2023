import React from 'react'
import ComponentWrapper from '@/components/ComponentWrapper'
import { Meal } from '@/server/model'

import MealPage from '@/components/Meal'
import { getMeal } from '@/queries/meals'

interface SingleMealProps {
  meal: Meal
}

const SingleMeal: React.FC<SingleMealProps> = ({ meal }) => {
  return (
    <ComponentWrapper>
      <MealPage meal={meal} />
    </ComponentWrapper>
  )
}

export async function getServerSideProps(context: any) {
  const { params: { id } } = context
  const meal = await getMeal(id)
  return {
    props: { meal }
  }
}

export default SingleMeal
