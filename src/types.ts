export interface Meal {
  name: string;
  category: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  ingredients: string[];
}

export interface DayPlan {
  id: string;
  date: string;
  meals: Meal[];
}

export interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}