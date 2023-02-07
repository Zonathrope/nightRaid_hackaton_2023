import { useQuery } from 'react-query'
import axios from 'axios'

const getMeals = async (title: string, isExternalSite: boolean) => {
  return (await axios.get(`/api/meals?title=${title}&isExternalWebsite=${isExternalSite}`)).data
}

export const useGetMeals = (title: string, isExternalSite: boolean) => {
  return useQuery(['get-meals', title, isExternalSite], () => getMeals(title, isExternalSite), {
    enabled: !!title
  })
}

const getMeal = async (id: string) => {
  return (await axios.get(`/api/meals/${id}`)).data
}

export const useGetMeal = (id: string) => {
  return useQuery(['meal', id], () => getMeal(id), {
    enabled: !!id
  })
}

const getMealsByIngredients = async (ingredient: string) => {
  const query = ingredient.replace(/ /g, '_')
  return (await axios.get(`/api/meals/getMealByIngridients?ingridients=${query}`)).data
}

export const useGetMealsByIngredients = (ingredient: string) => {
  return useQuery(['get-meal-ingredient', ingredient], () => getMealsByIngredients(ingredient))
}
