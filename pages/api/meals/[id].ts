import type { NextApiRequest, NextApiResponse } from 'next';
import {getMealByid} from "../../../src/server/externalApi/mealDBRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const { id } = req.query;

    res.status(200).json(await getMealByid(id as string));
    
}