import React from 'react'
import { useGetUserIngredients } from '@/queries/ingredients'
import Ingredient from '@/components/Fridge/UserIngredients/Ingredient'

import styles from './UserIngredients.module.scss'

interface UserIngredientsProps {
  userId: string
  setSuggestion: React.Dispatch<React.SetStateAction<string | null>>
}

const UserIngredients: React.FC<UserIngredientsProps> = ({ userId, setSuggestion }) => {
  const {
    data,
    isLoading
  } = useGetUserIngredients(userId)
  if (isLoading) {
    return <>Loading</>
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(data?.grouped)
        .map((el) => <div className={styles.sortedWrapper} key={el}>
        <p>{el}</p>
        {data.grouped?.[el]
          .map((el) =>
          <Ingredient
            setSuggestion={setSuggestion}
            userId={userId}
            key={el.id}{...el} />)}
      </div>)}
    </div>
  )
}

export default UserIngredients
