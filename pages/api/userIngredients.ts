import type { NextApiRequest, NextApiResponse } from 'next';
import {addIngredient, getIngredientList, deleteIngredientFromUser, updateUserIngredient} from "../../src/server/service/user-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
      //get user ingredients
      res.status(200).json(await getIngredientList(req.query._id as string));
    } else if(req.method === 'POST') {
      //insert new ingredient in user
      res.status(200).json(await addIngredient(req.body._id, req.body.idInMealDB, req.body.nameOfIngredient, req.body.typeOfIngredient, req.body.amount));
    } else if (req.method === 'PATCH') {
      //update user ingredient amount
      res.status(200).json(await updateUserIngredient(req.body.ingredientId, req.body.ingredientNewAmount));
    } else if (req.method === 'DELETE') {
      //delete ingredient by userId and ingredientId
      res.status(200).json(await deleteIngredientFromUser(req.body._id, req.body.ingredientId));
    }
}

