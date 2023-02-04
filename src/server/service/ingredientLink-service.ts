import dotenv  from "dotenv";
dotenv.config();

import {MyError, Ingredient_Link} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";
import {IngredientModel} from "../dto/ingredient.dto";
import {UserModel} from "../dto/user.dto";
import {IngredientLinkModel} from "../dto/ingredientLink.dto";

const db = DatabaseConnectionManager.getInstance().createDatabaseConnection();

export const addIngredientToUser = async (userId: string, ingredientId: string, amount: string): Promise<any> => {
    try {
        return addToDatabaseIngredientToUser(userId, ingredientId, amount);
    } catch { 
        const error = {
            errorMessage: "Can not add ingredient link.",
            statusCode: 500
        };
        return error;
    }
};

async function addToDatabaseIngredientToUser(userId: string, ingredientId: string, amount: string): Promise<Ingredient_Link | MyError> {
    
    const user = await UserModel.find({ _id: userId });
    const ingredient = await IngredientModel.find({id: ingredientId});

    if (ingredient[0] === null || ingredient[0] === undefined) {
        return {
            errorMessage: "Can not find ingredient.",
            statusCode: 404
        };
    }
    if (user[0] === null || user[0] === undefined) {
        return {
            errorMessage: "Can not find user.",
            statusCode: 404
        };
    }

    const ingredientLink = new IngredientLinkModel({
        user: user,
        ingredient: ingredient,
        amount: amount
    });
    
    return ingredientLink.save({});
}