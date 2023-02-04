import mongoose from "mongoose";
import {Ingredient} from "../model/index";

const ingredientSchema = new mongoose.Schema<Ingredient>({
    name: { type: String, required: true },
    id: {type: String, required: false},
    type: {type: String, required: true}
});

const IngredientModel = mongoose.models.Ingredient || mongoose.model<Ingredient>('Ingredient', ingredientSchema, "ingredient");

export {
    IngredientModel,
    ingredientSchema
};
