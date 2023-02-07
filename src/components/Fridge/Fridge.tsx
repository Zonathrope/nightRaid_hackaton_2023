import React from 'react'

import styles from './Fridge.module.scss'
import AddIngredient from '@/components/Fridge/AddIngredient/AddIngredient'
import useUser from '@/hooks/user'
import { Ingredient } from '@/server/model'
import UserIngredients from '@/components/Fridge/UserIngredients'

interface FridgeProps {
  ingredients: Array<Ingredient>
}

const Fridge: React.FC<FridgeProps> = ({ ingredients }) => {
  const { data } = useUser()
  const { id } = data || { id: null }

  return (
    <div className={styles.wrapper}>
      <AddIngredient userId={id as string} ingredients={ingredients}/>
      <UserIngredients userId={id as string}/>
    </div>
  )
}

export default Fridge
