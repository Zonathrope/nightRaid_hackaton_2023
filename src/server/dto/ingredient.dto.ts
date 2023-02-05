import mongoose from 'mongoose'
import { Ingredient } from '../model/index'

const ingredientSchema = new mongoose.Schema<Ingredient>({
  idInMealDB: { type: String, required: false },
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: String, required: true }
})

const IngredientModel =
  mongoose.models.Ingredient ||
  mongoose.model<Ingredient>('Ingredient', ingredientSchema, 'ingredient')

export { IngredientModel, ingredientSchema }
