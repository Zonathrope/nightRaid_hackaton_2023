import type { NextApiRequest, NextApiResponse } from 'next';
import {getAllIngredientsList, getMealsByTitle} from "../../../src/server/externalApi/mealDBRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const title: string = req.query.title as string;
    if (!!title) {
        res.status(200).json((await getMealsByTitle(title)) as string);
    } else {
        res.status(200).json((await getAllIngredientsList()) as string);
    }   
}