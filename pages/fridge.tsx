import React from 'react'
import ComponentWrapper from '@/components/ComponentWrapper'

import FridgePage from '@/components/Fridge'
import { getAllIngredientsList } from '@/server/externalApi/mealDBRequest'
import { Ingredient } from '@/server/model'

interface FridgeProps {
  ingredients: Array<Ingredient>
}

export async function getStaticProps() {
  const ingredients = await getAllIngredientsList()
  return {
    props: { ingredients }
  }
}

const Fridge: React.FC<FridgeProps> = ({ ingredients }) => {
  return (<ComponentWrapper secured><FridgePage ingredients={ingredients}/></ComponentWrapper>)
}



export default Fridge
