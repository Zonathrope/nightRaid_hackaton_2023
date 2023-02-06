import { Ingredient } from '../model/index'
import DatabaseConnectionManager from '../database-connection-manager'
import { IngredientModel } from '../dto/ingredient.dto'

DatabaseConnectionManager.getInstance()

async function createNewIngredient(
  ingredientIdInMealDB: string,
  nameOfIngredient: string,
  typeOfIngredient: string,
  ingredientAmount: string
): Promise<Ingredient> {
  const ingredientModel = new IngredientModel({
    idInMealDB: ingredientIdInMealDB,
    name: nameOfIngredient,
    type: typeOfIngredient,
    amount: ingredientAmount
  })

  return ingredientModel.save({})
}

async function deletengredientFromDB(ingredientId: string): Promise<boolean> {
  return (
    (await IngredientModel.deleteOne({ _id: ingredientId })).deletedCount > 0
  )
}

async function updateUserIngredientInDB(
  ingredientId: string,
  ingredientNewAmount: string
): Promise<boolean> {
  return (
    (
      await IngredientModel.updateOne(
        { _id: ingredientId },
        { amount: ingredientNewAmount }
      )
    ).modifiedCount > 0
  )
}

export const createIngredient = async (
  ingredientIdInMealDB: string,
  nameOfIngredient: string,
  typeOfIngredient: string,
  ingredientAmount: string
): Promise<Ingredient> => {
  return createNewIngredient(
    ingredientIdInMealDB,
    nameOfIngredient,
    typeOfIngredient,
    ingredientAmount
  )
}

export const deleteIngredient = async (
  ingredientId: string
): Promise<boolean> => {
  return deletengredientFromDB(ingredientId)
}

export const updateIngredient = async (
  ingredientId: string,
  ingredientAmount: string
): Promise<boolean> => {
  return updateUserIngredientInDB(ingredientId, ingredientAmount)
}
