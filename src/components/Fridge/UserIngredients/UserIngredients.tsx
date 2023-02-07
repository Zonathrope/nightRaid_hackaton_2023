import React from 'react'
import { useGetUserIngredients } from '@/queries/ingredients'
import Ingredient from '@/components/Fridge/UserIngredients/Ingredient'

import styles from './UserIngredients.module.scss'

interface UserIngredientsProps {
  userId: string
}

const UserIngredients: React.FC<UserIngredientsProps> = ({ userId }) => {
  const {
    data,
    isLoading
  } = useGetUserIngredients(userId)
  if (isLoading) {
    return <>Loading</>
  }

  return (
    <div className={styles.wrapper}>
      {Object.keys(data)
        .map((el) => <div className={styles.sortedWrapper} key={el}>
        <p>{el}</p>
        {data[el]
          .map((el) =>
          <Ingredient
            userId={userId}
            key={el.id}{...el} />)}
      </div>)}
    </div>
  )
}

export default UserIngredients
