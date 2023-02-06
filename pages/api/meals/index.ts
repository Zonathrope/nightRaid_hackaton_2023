import { MyError } from '@/server/model'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMealsByTitle } from '@/server/externalApi/mealDBRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | MyError>
) {
  const title: string = req.query.title as string
  try {
    res.status(200).json((await getMealsByTitle(title)) as string)
  } catch (e) {
    const error: MyError = {
      error: e,
      errorMessage: 'Can not get meal by title in MealDB.',
      statusCode: 500
    }
    res.status(error.statusCode).json(error)
  }
    const title: string = req.query.title as string;
    if (!!title) {
        res.status(200).json((await getMealsByTitle(title)) as string);
    } else {
        res.status(200).json((await getAllIngredientsList()) as string);
    }   
}
