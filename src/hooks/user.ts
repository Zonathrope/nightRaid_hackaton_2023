import localStorage from '@/lib/localStorage'
import { useQuery } from 'react-query'

interface IUser {
  isAuthorized: boolean,
  id: string | null
}

const getUser = (): IUser => {
  if (typeof window !== 'undefined') {
    const id: string | null = localStorage.getUserId()
    return {
      isAuthorized: !!id,
      id
    }
  }
  return {
    isAuthorized: false,
    id: null
  }
}

const useUser = () => {
  return useQuery(['user'], () => getUser(), {
    refetchOnMount: true,
    cacheTime: 0
  })
}

export default useUser
