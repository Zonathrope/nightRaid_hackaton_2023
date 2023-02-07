import React, { useState } from 'react'
import { useDeleteIngredient, useUpdateIngredient } from '@/queries/ingredients'

import styles from './Ingredient.module.scss'

interface IngredientProps {
  userId: string
  _id: string
  name: string
  type: string
  amount: string
}

const Ingredient: React.FC<IngredientProps> = ({
  userId,
  _id,
  name,
  amount: defaultAmount
}) => {
  const { mutate } = useUpdateIngredient()
  const { mutate: deleteIngredient } = useDeleteIngredient()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [amount, setAmount] = useState(defaultAmount)

  const handleChangeAmount = (value: string = '') => {
    setAmount(() => value)
  }

  const handleSaveAmount = () => {
    if (amount !== defaultAmount) {
      mutate({
        ingredientId: _id,
        ingredientNewAmount: amount
      }, {
        onSuccess: () => {
          setIsEditing(false)
        }
      })
    } else {
      setIsEditing(false)
    }
  }

  const handleDeleteIngredient = () => {
    deleteIngredient({
      userId,
      ingredientId: _id
    })
  }

  const handleCancel = () => {
    setAmount(defaultAmount)
    setIsEditing(false)
  }
  return (
    <div className={styles.wrapper}>
      <input type='text' disabled value={name} />
      <input type='text' onChange={(e) => handleChangeAmount(e.target.value)} disabled={!isEditing} value={amount} />
      {isEditing ? <>
        <button onClick={handleSaveAmount}>save</button>
        <button onClick={handleCancel}>cancel</button>
      </> : <>
        <button onClick={() => setIsEditing(true)}>update</button>
        <button onClick={handleDeleteIngredient}>delete</button>
      </>}

    </div>
  )
}

export default Ingredient
