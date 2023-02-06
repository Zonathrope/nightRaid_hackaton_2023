import { MyError } from '@/server/model'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMealByid } from '@/server/externalApi/mealDBRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | MyError>
) {
  const { id } = req.query

  try {
    res.status(200).json(await getMealByid(id as string))
  } catch (e) {
    const error: MyError = {
      error: e,
      errorMessage: 'Can not get meal by index from MealDB.',
      statusCode: 500
    }
    res.status(error.statusCode).json(error)
  }
  res.status(200).json(await getMealByid(id as string))
}
