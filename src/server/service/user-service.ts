import { User } from '../model/index'
import DatabaseConnectionManager from '../database-connection-manager'
import { UserModel } from '../dto/user.dto'
import {
  createIngredient,
  deleteIngredient,
  updateIngredient
} from './ingredient-service'

DatabaseConnectionManager.getInstance()

async function create(login: string, password?: string): Promise<User> {
  const user = new UserModel({
    login,
    password
  })

  return user.save({})
}

async function get(login: string): Promise<User | null> {
  return UserModel.findOne({ login })
}

async function addIngredientToUser(
  userId: string,
  ingredientIdInMealDB: string,
  nameOfIngredient: string,
  typeOfIngredient: string,
  amount: string
): Promise<boolean> {
  const newIngredient: any = await createIngredient(
    ingredientIdInMealDB,
    nameOfIngredient,
    typeOfIngredient,
    amount
  )

  if (newIngredient.statusCode === 500) {
    return newIngredient
  }

  return (
    (
      await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { ingredientsList: newIngredient } },
        { new: true, useFindAndModify: false }
      )
    ).modifiedCount > 0
  )
}

async function getIngredientsListFromDB(
  userId: string
): Promise<User | unknown> {
  return UserModel.findOne({ user: userId }).populate('ingredientsList', '-__v')
}

async function deleteIngredientFromList(
  userId: string,
  ingredientId: string
): Promise<boolean> {
  await deleteIngredient(ingredientId)

  return (
    (
      await UserModel.updateOne(
        { _id: userId },
        { $pullAll: { ingredientsList: [{ _id: ingredientId }] } }
      )
    ).modifiedCount > 0
  )
}

export const createUser = async (
  login: string,
  password?: string
): Promise<User> => {
  return create(login, password)
}

export const getUser = async (login: string): Promise<User | null> => {
  return get(login)
}

export const addIngredient = async (
  userId: string,
  ingredientIdInMealDB: string,
  nameOfIngredient: string,
  typeOfIngredient: string,
  amount: string
): Promise<boolean> => {
  return addIngredientToUser(
    userId,
    ingredientIdInMealDB,
    nameOfIngredient,
    typeOfIngredient,
    amount
  )
}

export const getIngredientList = async (
  userId: string
): Promise<User | unknown> => {
  return getIngredientsListFromDB(userId)
}

export const deleteIngredientFromUser = async (
  userId: string,
  ingredientId: string
): Promise<boolean> => {
  return deleteIngredientFromList(userId, ingredientId)
}

export const updateUserIngredient = async (
  ingredientId: string,
  ingredientAmount: string
): Promise<boolean> => {
  return updateIngredient(ingredientId, ingredientAmount)
}
