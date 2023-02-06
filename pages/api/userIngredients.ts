/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  addIngredient,
  getIngredientList,
  deleteIngredientFromUser,
  updateUserIngredient
} from '@/server/service/user-service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // get user ingredients
  if (req.method === 'GET') {
    try {
      res.status(200).json(await getIngredientList(req.query._id as string))
    } catch (e) {
      const error = {
        error: e,
        errorMessage: 'Can not get user ingredients.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
    // insert new ingredient in user
  } else if (req.method === 'POST') {
    try {
      res
        .status(200)
        .json(
          await addIngredient(
            req.body._id,
            req.body.idInMealDB,
            req.body.nameOfIngredient,
            req.body.typeOfIngredient,
            req.body.amount
          )
        )
    } catch (e) {
      const error = {
        error: e,
        errorMessage: 'Can not add new ingredient in user.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
    // update user ingredient amount
  } else if (req.method === 'PATCH') {
    try {
      res
        .status(200)
        .json(
          await updateUserIngredient(
            req.body.ingredientId,
            req.body.ingredientNewAmount
          )
        )
    } catch (e) {
      const error = {
        error: e,
        errorMessage: 'Can not update users ingredient.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
    // delete ingredient by userId and ingredientId
  } else if (req.method === 'DELETE') {
    try {
      res
        .status(200)
        .json(
          await deleteIngredientFromUser(req.body._id, req.body.ingredientId)
        )
    } catch (e) {
      const error = {
        error: e,
        errorMessage: 'Can not delete users ingredient.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
  }
}
