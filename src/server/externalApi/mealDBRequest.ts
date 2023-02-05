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

export async function getAllIngredientsList() {
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