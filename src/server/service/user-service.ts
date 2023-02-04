import dotenv  from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import {Ingredient, MyError, User, Ingredient_Link} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";
import {UserModel} from "../schema/user.dto";
import {IngredientModel} from "../schema/ingredient.dto";
import {IngredientLinkModel} from "../schema/ingredientLink.dto";

const db = DatabaseConnectionManager.getInstance().createDatabaseConnection();

export const addNewUser = async (login: string, password?: string) => {
    try {
        return addNewUserToDatabase(login, password);
    } catch { 
        const error = {
            errorMessage: "Can not add new user.",
            statusCode: 500
        };

        return error;
    }
};

export const getUser = async (login: string) => {
    try {
        return getUserByLogin(login);
    } catch {
        const error = {
            errorMessage: "Can not find user.",
            statusCode: 500
        };

        return error;
    }
}

async function addNewUserToDatabase(login: string, password?: string): Promise<User | MyError> {
    const user = new UserModel({
        login: login,
        password: password
    });
    
    return user.save();
}

async function getUserByLogin(login: string): Promise<User | MyError | null> {
    
    return UserModel.findOne({login: login});
}