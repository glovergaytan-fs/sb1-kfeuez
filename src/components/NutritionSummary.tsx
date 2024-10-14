import React from 'react';
import { DayPlan } from '../types';
import { PieChart } from 'lucide-react';

interface NutritionSummaryProps {
  weekPlan: DayPlan[];
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ weekPlan }) => {
  const totalCalories = weekPlan.reduce((total, day) => 
    total + day.meals.reduce((dayTotal, meal) => dayTotal + meal.calories, 0), 0
  );

  const dailyAverage = totalCalories / 7;

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <PieChart size={24} className="mr-2" />
        Nutrition Summary
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Total Weekly Calories</h3>
          <p className="text-3xl font-bold">{totalCalories.toFixed(0)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Daily Average</h3>
          <p className="text-3xl font-bold">{dailyAverage.toFixed(0)}</p>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400"
            style={{ width: `${Math.min((dailyAverage / 2500) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-center">
          {Math.round((dailyAverage / 2500) * 100)}% of 2500 kcal recommended daily intake
        </p>
      </div>
    </div>
  );
};

export default NutritionSummary;