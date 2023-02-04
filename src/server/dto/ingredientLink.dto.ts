import mongoose from "mongoose";
import {Ingredient_Link} from "../model/index";
import {ingredientSchema} from "./ingredient.dto";

const ingredientLinkSchema = new mongoose.Schema<Ingredient_Link>({
    user: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    ingredient: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient"
    }],
    amount: { type: String, required: true }
});

const IngredientLinkModel = mongoose.models.IngredientLink || mongoose.model<Ingredient_Link>('IngredientLink', ingredientLinkSchema, "ingredient_link");

export {
    IngredientLinkModel,
    ingredientLinkSchema
};