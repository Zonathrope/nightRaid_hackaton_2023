export interface Ingredient {
  name: string,
  id: string,
  type: string,
  isCreatedByUser: boolean
}

export interface Ingredient_Link {
  ingredient: Ingredient,
  amount: string
}

export interface Meal {
  id: string,
  title: string,
  image: string,
  description: string,
  ingredients: Array<Ingredient_Link>
}

export interface User {
  ingredients: Array<Ingredient_Link>,
  login: string,
  password?: string
}



