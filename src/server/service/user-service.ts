import dotenv  from "dotenv";
dotenv.config();

import {MyError, User} from "../model/index";
import DatabaseConnectionManager from "../database-connection-manager";
import {UserModel} from "../dto/user.dto";
import {createIngredient, deleteIngredient, updateIngredient} from "../service/ingredient-service";

DatabaseConnectionManager.getInstance();

export const createUser = async (login: string, password?: string): Promise<User | MyError> => {
    return create(login, password);
};

export const getUser = async (login: string): Promise<User | MyError | null> => {
    return get(login);
};

export const addIngredient = async (userId: string, ingredientIdInMealDB: string, nameOfIngredient: string, typeOfIngredient: string, amount: string): Promise<boolean | MyError> => {
    return addIngredientToUser(userId, ingredientIdInMealDB, nameOfIngredient, typeOfIngredient, amount);
}

export const getIngredientList = async (userId: string): Promise<User | MyError> => {
    return getIngredientsListFromDB(userId);
}

export const deleteIngredientFromUser = async (userId: string, ingredientId: string): Promise<boolean | MyError> => {
    return deleteIngredientFromList(userId, ingredientId);
}

export const updateUserIngredient = async (ingredientId: string, ingredientAmount: string): Promise<boolean | MyError> => {
    return updateIngredient(ingredientId, ingredientAmount);
}

async function create(login: string, password?: string): Promise<User | MyError> {
    const user = new UserModel({
        login: login,
        password: password
    });
    
    try {
        return user.save();
    } catch {
        const error = {
            errorMessage: "Can not add new user.",
            statusCode: 500
        };

        return error;
    }
}

async function get(login: string): Promise<User | MyError | null> {
    try {
        return UserModel.findOne({login: login});
    } catch {
        const error = {
            errorMessage: "Can not find user.",
            statusCode: 404
        };

        return error;
    }
}

async function addIngredientToUser(userId: string, ingredientIdInMealDB: string, nameOfIngredient: string, typeOfIngredient: string, amount: string): Promise<boolean | MyError> {
    const newIngredient: any = await createIngredient(ingredientIdInMealDB, nameOfIngredient, typeOfIngredient, amount);

    if (newIngredient.statusCode === 500) {
        return newIngredient;
    }

    try {
        return ( await UserModel.updateOne(
            {_id: userId},
            { $addToSet: { ingredientsList: newIngredient } },
            { new: true, useFindAndModify: false }
        )).modifiedCount > 0;
    } catch {
        const error = {
            errorMessage: "Can not add ingredient.",
            statusCode: 500
        };

        return error;
    }
};



async function getIngredientsListFromDB(userId: string): Promise<User | MyError> {
    try {
        return UserModel.findOne({user: userId}).populate("ingredientsList", "-__v");
    } catch {
        const error = {
            errorMessage: "Can not get ingredients list.",
            statusCode: 500
        };

        return error;
    }
}

async function deleteIngredientFromList(userId: string, ingredientId: string): Promise<boolean | MyError> {
    try {
        await deleteIngredient(ingredientId);
    } catch {
        const error = {
            errorMessage: "Can not delete ingredient from database.",
            statusCode: 500
        };

        return error;
    }
    try {
        return (await UserModel.updateOne({ _id: userId }, {$pullAll : { ingredientsList: [{_id: ingredientId}]}})).modifiedCount > 0;
    } catch {
        const error = {
            errorMessage: "Can not delete ingredient from user list.",
            statusCode: 500
        };

        return error;
    }
}