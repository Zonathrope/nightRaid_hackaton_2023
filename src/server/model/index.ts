export interface Ingredient {
  name: string,
  id: string,
  isCreatedByUser: boolean
}

export interface Ingredient_Link {
  meal?: Meal,
  user?: User
  ingredient: Ingredient,
  type: string,
  amount: string
}

export interface Meal {
  id: string,
  title: string,
  image: string,
  description: string
}

export interface User {
  login: string,
  password?: string
}

export interface MyError{
  errorMessage: string,
  statusCode: number
}


