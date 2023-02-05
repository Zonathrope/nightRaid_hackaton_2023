import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, getUser } from '@/server/service/user-service'
import { MyError, User } from '@/server/model/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | MyError | null>
) {
  if (req.method === 'POST') {
    try {
      res
        .status(200)
        .json(
          await createUser(
            req.body.login as string,
            req.body.password as string
          )
        )
    } catch (e) {
      const error: MyError = {
        error: e,
        errorMessage: 'Can not add new ingredient in user.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
  } else if (req.method === 'GET') {
    try {
      res.status(200).json(await getUser(req.query.login as string))
    } catch (e) {
      const error: MyError = {
        error: e,
        errorMessage: 'Can not get user.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
  }
}
