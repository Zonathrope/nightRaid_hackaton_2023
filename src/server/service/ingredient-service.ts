import dotenv  from "dotenv";
dotenv.config();

import {Ingredient, MyError} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";
import {IngredientModel} from "../dto/ingredient.dto";

DatabaseConnectionManager.getInstance();

export const createIngredient = async (ingredientIdInMealDB: string, nameOfIngredient: string, typeOfIngredient: string, ingredientAmount: string): Promise<Ingredient | MyError> => {
    return createNewIngredient(ingredientIdInMealDB, nameOfIngredient, typeOfIngredient, ingredientAmount);
}

export const deleteIngredient = async (ingredientId: string): Promise<boolean | MyError> => {
    return deletengredientFromDB(ingredientId);
}

export const updateIngredient = async (ingredientId: string, ingredientAmount: string): Promise<boolean | MyError> => {
    return updateUserIngredientInDB(ingredientId, ingredientAmount);
}

async function createNewIngredient(ingredientIdInMealDB: string, nameOfIngredient: string, typeOfIngredient: string, ingredientAmount: string): Promise<Ingredient | MyError> {
    const ingredientModel = new IngredientModel({
        idInMealDB: ingredientIdInMealDB,
        name: nameOfIngredient,
        type: typeOfIngredient,
        amount: ingredientAmount
    });

    try {
        return ingredientModel.save({});
    } catch {
        const error = {
            errorMessage: "Can not create ingredient.",
            statusCode: 500
        };

        return error;
    }
}

async function deletengredientFromDB(ingredientId: string): Promise<boolean | MyError> {
    try {
        return (await IngredientModel.deleteOne({_id: ingredientId})).deletedCount > 0;
    } catch {
        const error = {
            errorMessage: "Can not create ingredient.",
            statusCode: 500
        };

        return error;
    }
}

async function updateUserIngredientInDB(ingredientId: string, ingredientNewAmount: string): Promise<boolean | MyError> {
    try {
        return (await IngredientModel.updateOne({ _id: ingredientId}, {amount: ingredientNewAmount})).modifiedCount > 0;
    } catch {
        const error = {
            errorMessage: "Can not update ingredient.",
            statusCode: 500
        };

        return error;
    }
}