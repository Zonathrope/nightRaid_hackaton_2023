import type { NextApiRequest, NextApiResponse } from 'next';
import {addIngredient, getAllIngredientsFromDatabase} from '../../src/server/service/ingredient-service';
import {Ingredient, MyError} from "../../src/server/model/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ingredient | MyError | Array<Ingredient>>
) {
    if (req.method === 'POST') {
        res.status(200).json(await addNewIngredient());
      } else if(req.method === 'GET') {
        res.status(200).json(await getAllIngredients());
      }
}

async function addNewIngredient():  Promise<Ingredient | MyError>{

    return addIngredient();
}

async function getAllIngredients(): Promise<Array<Ingredient> | MyError> {

  

  return getAllIngredientsFromDatabase();
}