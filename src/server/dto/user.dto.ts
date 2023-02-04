import mongoose from "mongoose";
import {User} from "../model/index";

const userSchema = new mongoose.Schema<User>({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: false }
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema, "user");

export {
    UserModel,
    userSchema
};