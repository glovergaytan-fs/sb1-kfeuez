import { NutritionData } from '../types';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID || '';
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY || '';

export const fetchNutritionData = async (ingredient: string): Promise<NutritionData> => {
  if (!APP_ID || !APP_KEY) {
    console.warn('Edamam API credentials are not set. Using mock data.');
    return generateMockNutritionData(ingredient);
  }

  const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${encodeURIComponent(ingredient)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      calories: data.calories,
      protein: data.totalNutrients.PROCNT.quantity,
      fat: data.totalNutrients.FAT.quantity,
      carbs: data.totalNutrients.CHOCDF.quantity,
    };
  } catch (error) {
    console.error('Error fetching nutrition data:', error);
    return generateMockNutritionData(ingredient);
  }
};

export const generateMockNutritionData = (ingredient: string): NutritionData => {
  // Generate random nutritional values for demonstration purposes
  return {
    calories: Math.floor(Math.random() * 300) + 50,
    protein: Math.floor(Math.random() * 20) + 1,
    fat: Math.floor(Math.random() * 15) + 1,
    carbs: Math.floor(Math.random() * 30) + 5,
  };
};