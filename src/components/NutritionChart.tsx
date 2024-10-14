import React from 'react';

interface NutritionChartProps {
  calories: number;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ calories }) => {
  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-semibold">Calories: {calories}</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400"
          style={{ width: `${Math.min((calories / 2500) * 100, 100)}%` }}
        />
      </div>
      <div className="text-xs mt-1 text-right">
        <span>{Math.round((calories / 2500) * 100)}% of 2500 kcal daily goal</span>
      </div>
    </div>
  );
};

export default NutritionChart;