export interface IngredientInitialValues {
  name?: string,
  amount?: string,
  type?: string
}

export const ingredientInitialValues = {
  name: '',
  amount: '',
  type: ''
}

export const required = (value: string | undefined): 'Required' | undefined => {
  return value ? undefined : 'Required'
}
export const validation = (values: IngredientInitialValues) => {
  const errors: IngredientInitialValues = {}
  errors.name = required(values.name)
  errors.amount = required(values.amount)
  errors.type = required(values.type)
  return errors
}
