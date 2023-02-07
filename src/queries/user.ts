import { useMutation } from 'react-query'
import axios from 'axios'
import LocalStorage from '@/lib/localStorage'
import { User } from '@/server/model'

interface ICreateUser {
  login: string,
  password: string,
  isRegister: boolean
}

export const createUser = async (data: ICreateUser) => {
  const { isRegister } = data
  const usr: User = (await axios.post(isRegister ? '/api/user' : '/api/user/login', data)).data
  if (usr?._id) {
    LocalStorage.setUserId(usr._id)
  }
  if (usr.errorMessage) {
    throw new Error(errorMessage)
  }
  return true
}

export const useAuthorize = () => {
  return useMutation((data: ICreateUser) => createUser(data))
}
