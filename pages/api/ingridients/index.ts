import { MyError } from '@/server/model'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllIngredientsList } from '@/server/externalApi/mealDBRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | MyError>
) {
  try {
    res.status(200).json((await getAllIngredientsList()) as string)
  } catch (e) {
    const error: MyError = {
      error: e,
      errorMessage: 'Can not add new ingredient in user.',
      statusCode: 500
    }
    res.status(error.statusCode).json(error)
  }
}
