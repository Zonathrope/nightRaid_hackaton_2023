import dotenv  from "dotenv";
dotenv.config();

import {Ingredient, MyError} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";
import {IngredientModel} from "../dto/ingredient.dto";

const db = DatabaseConnectionManager.getInstance().createDatabaseConnection();

export const addIngredient = async () => {
    try {
        return addToDatabase();
    } catch { 
        const error = {
            errorMessage: "Can not add new ingredient.",
            statusCode: 500
        };
        return error;
    }
};

export const getAllIngredientsFromDatabase = async () => {
    try {
        return getAllIngredients();
    } catch {
        const error = {
            errorMessage: "Can not get ingredients from database.",
            statusCode: 500
        };
        return error;
    }
};

async function addToDatabase(): Promise<Ingredient | MyError> {
    const ingridient = new IngredientModel({ 
        id: "asd12",
        name: "name",
        type: "type"
    });
    
    return ingridient.save();
}

async function getAllIngredients(): Promise<Array<Ingredient> | MyError> {
    return IngredientModel.find({});
}