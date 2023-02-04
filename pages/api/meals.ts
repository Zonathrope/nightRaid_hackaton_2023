import type { NextApiRequest, NextApiResponse } from 'next';
import {getAllIngredientsFromDatabase} from '../../src/server/service/ingredient-service';
import {Ingredient, MyError} from "../../src/server/model/index";
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    let isExternalWebsite: boolean = req.query.isExternalWebsite === "true"? true: false;
    const title: string = req.query.title as string;
    if (isExternalWebsite) {
        res.status(200).json(await getMealsByTitleFromMealDB(title));
    } else {
        res.status(200).json(await getIngredients());
    }
}

// /api/meals?title=${title}&isExternalWebsite=${isExternalSite}`
async function getMealsByTitleFromMealDB(title: string) {
    const uri =`https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;

    const data = (await axios.get(uri)).data.meals
                    .map((el: any) => {
                        return {
                            id: el.idMeal,
                            title: el.strMeal,
                            image: el.strMealThumb,
                            description: el.strCategory
                        };
                    });
    

    return data;
}

async function getIngredients(): Promise<Array<Ingredient> | MyError> {
    
    return getAllIngredientsFromDatabase();
}

