import { MyError } from '@/server/model'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMealByIngredients } from '@/server/externalApi/mealDBRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | MyError>
) {
  const ingridients: string = req.query.ingridients as string
  try {
    res.status(200).json((await getMealByIngredients(ingridients)) as string)
  } catch (e) {
    const error: MyError = {
      error: e,
      errorMessage: 'Can not get meal with this products.',
      statusCode: 500
    }
    res.status(error.statusCode).json(error)
  }
}
