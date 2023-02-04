import mongoose from "mongoose";
import {Ingredient_Link} from "../model/index";
import {userSchema} from "./user.dto";
import {ingredientSchema} from "./ingredient.dto";

const ingredientLinkSchema = new mongoose.Schema<Ingredient_Link>({
    user: { type: userSchema, required: false },
    ingredient: { type: ingredientSchema, required: false },
    amount: { type: String, required: true }
});

const IngredientLinkModel = mongoose.models.IngredientLink || mongoose.model<Ingredient_Link>('IngredientLink', ingredientLinkSchema, "ingredient_link");

export {
    IngredientLinkModel,
    ingredientLinkSchema
};
