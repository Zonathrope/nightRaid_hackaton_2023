import React, { useState } from 'react'

import styles from './Fridge.module.scss'
import AddIngredient from '@/components/Fridge/AddIngredient/AddIngredient'
import useUser from '@/hooks/user'
import { Ingredient } from '@/server/model'
import UserIngredients from '@/components/Fridge/UserIngredients'
import Suggestions from '@/components/Fridge/Suggestions/Suggestions'

interface FridgeProps {
  ingredients: Array<Ingredient>
}

const Fridge: React.FC<FridgeProps> = ({ ingredients }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const { data } = useUser()
  const { id } = data || { id: null }

  return (
    <div>
      <div className={styles.wrapper}>
        <AddIngredient userId={id as string} ingredients={ingredients}/>
        <UserIngredients setSuggestion={setSuggestion} userId={id as string}/>
      </div>
      {suggestion && <Suggestions ingredient={suggestion} />}
    </div>
  )
}

export default Fridge
