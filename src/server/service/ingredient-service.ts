import dotenv  from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import {Ingredient, MyError} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";

const db = DatabaseConnectionManager.getInstance().createDatabaseConnection();
const ingridientSchema = new mongoose.Schema<Ingredient>({
    name: { type: String, required: true },
    id: {type: String, required: true},
    type: {type: String, required: true},
    isCreatedByUser: {type: Boolean, required: true}
});
const IngredientModel = mongoose.model<Ingredient>('Ingredient', ingridientSchema, "ingredient");

export const addIngredient = async () => {
    try {
        return addToDatabase();
    } catch { 
        const error = {
            errorMessage: "Can not add new ingredient.",
            statusCode: 500};
        return error;
    }
};

export const getAllIngredientsFromDatabase = async () => {
    try {
        return getAllIngredients();
    } catch {
        const error = {
            errorMessage: "Can not get ingredients from database.",
            statusCode: 500};
        return error;
    }
};

async function addToDatabase(): Promise<Ingredient | MyError> {
    const ingridient = new IngredientModel({ 
        name: "orange",
        id: "123213",
        type: "fruit",
        isCreatedByUser: true 
    });
    
    return ingridient.save();
}

async function getAllIngredients(): Promise<Array<Ingredient> | MyError> {
    return IngredientModel.find({});
}