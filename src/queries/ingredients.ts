import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

interface IcreateIngredient {
  _id: string,
  idInMealDB: string,
  nameOfIngredient: string,
  typeOfIngredient: string,
  amount: string
}

const createIngredient = async (data: IcreateIngredient) => {
  const response = (await axios.post('/api/userIngredients', data)).data
  return response
}

const updateIngredient = async (ingredientId: string, ingredientNewAmount: string) => {
  return (await axios.patch('/api/userIngredients', {
    ingredientId,
    ingredientNewAmount
  })).data
}

const deleteIngredient = async (userId: string, ingredientId: string) => {
  return (await axios.delete('/api/userIngredients', {
    data: {
      userId,
      ingredientId
    }
  })).data
}

const getUserIngredients = async (id: string) => {
  const response = (await axios.get(`/api/userIngredients?_id=${id}`)).data
  return response.ingredientsList
}

export const useCreateIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation((data: IcreateIngredient) => createIngredient(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('get-user-ingredients')
    }
  })
}

export const useGetUserIngredients = (id: string) => {
  return useQuery(['get-user-ingredients'], () => getUserIngredients(id), {
    enabled: !!id
  })
}

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient()
  return useMutation(({
    userId,
    ingredientId
  }: { userId: string, ingredientId: string }) => deleteIngredient(userId, ingredientId), {
    onSuccess: () => {
      queryClient.invalidateQueries('get-user-ingredients')
    }
  })
}

export const useUpdateIngredient = () => {
  return useMutation(({
    ingredientId,
    ingredientNewAmount
  }: { ingredientId: string, ingredientNewAmount: string }) => updateIngredient(ingredientId, ingredientNewAmount))
}
