import type { NextApiRequest, NextApiResponse } from 'next';
import {addNewUser, getUser} from '../../src/server/service/user-service';
import {Ingredient, MyError, User, Ingredient_Link} from "../../src/server/model/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | MyError | any>
) {
  if (req.method === 'POST') {
    res.status(200).json(await addNewUserToDatabase(req.body.login as string, req.body.password as string));
  } else if(req.method === 'GET') {
    res.status(200).json(await getUserByLogin(req.query.login as string));
  }
}

async function addNewUserToDatabase (login: string, password?: string): Promise<User | MyError> {

  return (await addNewUser(login, password));
}

async function getUserByLogin(login: string): Promise<User | MyError | null> {

  return (await getUser(login as string));
}