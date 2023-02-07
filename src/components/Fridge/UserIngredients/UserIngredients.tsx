import React from 'react'
import { useGetUserIngredients } from '@/queries/ingredients'
import Ingredient from '@/components/Fridge/UserIngredients/Ingredient'

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
    <div>
      {data.map((el) => <Ingredient
        userId={userId}
        _id={el._id}
        amount={el.amount}
        name={el.name}
        type={el.type}
        key={el._id}
      />)}
    </div>
  )
}

export default UserIngredients
