import type { NextApiRequest, NextApiResponse } from 'next';
import {getAllIngredientsFromDatabase} from '../../src/server/service/ingredient-service';
import {addIngredientToUser} from '../../src/server/service/ingredientLink-service';
import {Ingredient, MyError} from "../../src/server/model/index";
import {getAllIngredientsNameAndTypeFromMealDB} from "../../src/server/externalApi/mealDBRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        res.status(200).json(await getAllIngredientsNameAndTypeFromMealDB());
      } else if(req.method === 'PATCH') {
        res.status(200).json(await addIngredientToUser(req.body.userId, req.body.ingredientId, req.body.amount));
      }
}

