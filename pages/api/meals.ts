import type { NextApiRequest, NextApiResponse } from 'next';
import {getAllIngredientsFromDatabase} from '../../src/server/service/ingredient-service';
import {Ingredient, MyError} from "../../src/server/model/index";
import {getMealsByTitleFromMealDB} from "../../src/server/externalApi/mealDBRequest";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    let isExternalWebsite: boolean = req.query.isExternalWebsite === "true"? true: false;
    const title: string = req.query.title as string;
    if (isExternalWebsite) {
        res.status(200).json((await getMealsByTitleFromMealDB(title)) as string);
    } else {
        res.status(200).json(await getIngredients());
    }
}

async function getIngredients(): Promise<Array<Ingredient> | MyError> {
    
    return getAllIngredientsFromDatabase();
}

