import React, { useState } from 'react';
import { DayPlan, Meal } from '../types';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface WeeklyCalendarProps {
  weekPlan: DayPlan[];
  currentWeekOffset: number;
  setCurrentWeekOffset: (offset: number) => void;
}

const mealCategories = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  weekPlan,
  currentWeekOffset,
  setCurrentWeekOffset,
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + currentWeekOffset * 7);
    return Array(7).fill(null).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  return (
    <div className="space-y-4 bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-semibold">
          {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
          {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </h2>
        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      {weekDates.map((date) => {
        const dayId = date.toISOString().split('T')[0];
        const day = weekPlan.find(d => d.date === dayId) || { id: dayId, date: dayId, meals: [] };

        return (
          <div key={dayId} className="border border-white border-opacity-20 rounded-md overflow-hidden">
            <button
              onClick={() => toggleDay(dayId)}
              className="w-full flex justify-between items-center p-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <span className="font-semibold">
                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              {expandedDays[dayId] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {expandedDays[dayId] && (
              <div className="p-2 space-y-2">
                {mealCategories.map((category) => {
                  const meal = day.meals.find((m) => m.category === category);

                  return (
                    <div key={`${dayId}-${category}`} className="bg-white bg-opacity-10 rounded-md overflow-hidden">
                      {meal ? (
                        <div className="p-2">
                          <h3 className="font-medium">{meal.name || category}</h3>
                          <p className="text-sm">Calories: {meal.calories}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {meal.ingredients.map((ingredient, idx) => (
                              <span key={`${dayId}-${category}-ingredient-${idx}`} className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-2 text-center text-gray-400">
                          No {category} planned
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <button
        onClick={() => setCurrentWeekOffset(0)}
        className="mt-4 w-full bg-yellow-400 text-purple-900 p-2 rounded-md hover:bg-yellow-300 transition-colors"
      >
        Go to Current Week
      </button>
    </div>
  );
};

export default WeeklyCalendar;