import type { NextApiRequest, NextApiResponse } from 'next';
import {addNewUser, getUser} from '../../src/server/service/user-service';
import {Ingredient, MyError, User, Ingredient_Link} from "../../src/server/model/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | MyError | any>
) {
    if (req.method === 'POST') {
        await addNewUserToDatabase(req, res);
      } else if(req.method === 'GET') {
        await getUserByLogin(req, res);
      }
}

async function addNewUserToDatabase(
    req: NextApiRequest,
    res: NextApiResponse<User | MyError>
  ) {
    res.status(200).json(await addNewUser(req.body.login, req.body.password));
}

async function getUserByLogin(
    req: NextApiRequest,
    res: NextApiResponse<User | MyError | null>
  ) {
    
    const user: User | MyError | null = await getUser(req.query.login as string);
    
    res.status(200).json(user);
}
