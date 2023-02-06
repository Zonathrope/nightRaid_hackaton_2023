// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt'
import { User } from '../model/index'
import DatabaseConnectionManager from '../database-connection-manager'
import { UserModel } from '../dto/user.dto'
import {
  createIngredient,
  deleteIngredient,
  updateIngredient
} from './ingredient-service'

DatabaseConnectionManager.getInstance()

async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

async function create(login: string, passwordString: string): Promise<User> {
  const password: string = await hashPassword(passwordString)

  const user = new UserModel({
    login,
    password
  })

  return user.save({})
}

async function get(login: string): Promise<User | null> {
  return UserModel.findOne({ login })
}

async function isLoginCorrect(
  login: string,
  password: string
): Promise<User | null> {
  const user: User | null = await get(login)
  if (user == null) return null
  if (await bcrypt.compare(password, user.password as string)) {
    return user
  }
  return null
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
  password: string
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

export const loginInAccount = async (
  login: string,
  password: string
): Promise<User | null> => {
  return isLoginCorrect(login, password)
}
export const updateUserIngredient = async (
  ingredientId: string,
  ingredientAmount: string
): Promise<boolean> => {
  return updateIngredient(ingredientId, ingredientAmount)
}
