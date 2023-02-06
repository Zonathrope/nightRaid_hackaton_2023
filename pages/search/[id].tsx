import React from 'react'
import ComponentWrapper from '@/components/ComponentWrapper'

import MealPage from '@/components/Meal'
import { useGetMeal } from '@/queries/meals'

interface SingleMealProps {
  id: string
}

const SingleMeal: React.FC<SingleMealProps> = ({ id }) => {
  const {
    data,
    isLoading
  } = useGetMeal(id)

  if (isLoading) {
    return <>Loading</>
  }
  return (
    <ComponentWrapper>
      <MealPage meal={data} />
    </ComponentWrapper>
  )
}

export async function getServerSideProps(context: any) {
  const { params: { id } } = context
  return {
    props: { id }
  }
}

export default SingleMeal
