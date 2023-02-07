export interface Ingredient {
  idInMealDB: string
  id: string
  name: string
  type: string
  amount: string
}

export interface Meal {
  id: string
  title: string
  image: string
  description: string
}

export interface User {
  _id: string
  login: string
  password?: string
  ingredientsList: Array<Ingredient>
}

export interface MyError {
  error: unknown
  errorMessage: string
  statusCode: number
}
