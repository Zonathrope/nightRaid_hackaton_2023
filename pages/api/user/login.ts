import type { NextApiRequest, NextApiResponse } from 'next'
import { loginInAccount } from '@/server/service/user-service'
import { MyError, User } from '@/server/model/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null | MyError>
) {
  if (req.method === 'POST') {
    try {
      res
        .status(200)
        .json(
          await loginInAccount(req.body.login as string, req.body.password as string)
        )
    } catch (e) {
      const error: MyError = {
        error: e,
        errorMessage: 'Can not create new user.',
        statusCode: 500
      }
      res.status(error.statusCode).json(error)
    }
  }
}
