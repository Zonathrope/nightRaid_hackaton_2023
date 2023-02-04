import { useQuery } from 'react-query'
import { Ingredient } from '@/types'
import axios from 'axios'

const getAllIngredients = async (): Promise<Array<Ingredient>> => {
  return (await axios.get('/api/ingredients')).data
}

export const useGetAllIngredients = () => {
  return useQuery(['get-ingredients'], () => getAllIngredients())
}
