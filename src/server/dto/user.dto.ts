import mongoose from 'mongoose'
import { User } from '../model/index'

const userSchema = new mongoose.Schema<User>({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ingredientsList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  ]
})

const UserModel =
  mongoose.models.User || mongoose.model<User>('User', userSchema, 'user')

export { UserModel, userSchema }
