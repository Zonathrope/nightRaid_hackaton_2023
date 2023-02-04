import axios from 'axios';

export async function getMealsByTitle(title: string): Promise<string> {
    const uri =`https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`;

    const data = (await axios.get(uri)).data.meals
                    .map((el: any) => {
                        return {
                            id: el.idMeal,
                            title: el.strMeal,
                            image: el.strMealThumb,
                            description: el.strCategory
                        };
                    });
    
    return data;
}

export async function getMealByid(id: string): Promise<string> {
    const uri: string = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
    const meal: any = (await axios.get(uri)).data.meals[0];

    const preResponse: any = Object.keys(meal).reduce(
        (acc: any, curr: string) => {
          if (curr.includes('strIngredient')) {
            const value = meal[curr];
            if (!value) {
              return acc;
            }
            const currIndex = curr.slice(13, 15);
            const amount = meal[`strMeasure${currIndex}`];
            acc.ingredients.push({ name: value, amount });
            return acc;
          }
          if (curr.includes('strMeasure')) {
            return acc;
          }
          acc[curr] = meal[curr];
          return acc;
        },
        {
          ingredients: [],
        }
      );

    const response: any = {
        id: preResponse.idMeal,
        title: preResponse.strMeal,
        description: preResponse.strCategory,
        area: preResponse.strArea,
        instructions: preResponse.strInstructions,
        tags: preResponse.strTags,
        image: preResponse.strMealThumb,
        ingredients: preResponse.ingredients
    };
        
    return response;
}

export async function getAllIngredientsList(): Promise<string> {
    const uri = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;

    const data = (await axios.get(uri)).data.meals
        .map((ingredient: any) => {
            return {
                id: ingredient.idIngredient,
                name: ingredient.strIngredient,
                type: ingredient.strType
            };
        });
        
    return data;
}