import type { NextApiRequest, NextApiResponse } from 'next';
import {addIngredient, getAllIngredientsFromDatabase} from '../../src/server/service/ingredient-service';
import {Ingredient, MyError} from "../../src/server/model/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ingredient | MyError | Array<Ingredient>>
) {
    if (req.method === 'POST') {
        await addNewIngredient(req, res);
      } else if(req.method === 'GET') {
        await getIngredients(req, res);
      }
}

async function addNewIngredient(
    req: NextApiRequest,
    res: NextApiResponse<Ingredient | MyError>
  ) {
    res.status(200).json(await addIngredient());
}

async function getIngredients(
    req: NextApiRequest,
    res: NextApiResponse<Array<Ingredient> | MyError>
  ) {

    const response: Array<Ingredient> | MyError = await getAllIngredientsFromDatabase();
    
    res.status(200).json(response);
}
