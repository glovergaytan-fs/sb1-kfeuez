import React, { useState, useEffect, useRef } from 'react';
import { DayPlan, Meal } from '../types';
import { Trash2, Plus, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import ingredientDatabase from '../data/ingredientDatabase';

interface WeeklyPlannerProps {
  weekPlan: DayPlan[];
  addMeal: (date: string, meal: Meal) => void;
  updateMeal: (date: string, mealIndex: number, updatedMeal: Meal) => void;
  deleteMeal: (date: string, mealIndex: number) => void;
  currentWeekOffset: number;
  setCurrentWeekOffset: (offset: number) => void;
}

const mealCategories = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  weekPlan,
  addMeal,
  updateMeal,
  deleteMeal,
  currentWeekOffset,
  setCurrentWeekOffset,
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});
  const [newIngredient, setNewIngredient] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const currentDayId = weekPlan.find(day => day.date === today)?.id;
    if (currentDayId) {
      setExpandedDays(prev => ({ ...prev, [currentDayId]: true }));
    }
  }, [weekPlan]);

  const toggleDay = (dayId: string) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const toggleMeal = (dayId: string, category: string) => {
    const key = `${dayId}-${category}`;
    setExpandedMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleIngredientChange = (value: string) => {
    setNewIngredient(value);
    const filtered = ingredientDatabase.filter(ingredient =>
      ingredient.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredIngredients(filtered.slice(0, 10)); // Show top 10 matches
  };

  const handleAddIngredient = (date: string, mealIndex: number, ingredient: string) => {
    const dayPlan = weekPlan.find(day => day.date === date);
    if (dayPlan) {
      const updatedMeal = { ...dayPlan.meals[mealIndex] };
      updatedMeal.ingredients.push(ingredient);
      updateMeal(date, mealIndex, updatedMeal);
    }
    setNewIngredient('');
    setFilteredIngredients([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setFilteredIngredients([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (
    <div className="space-y-2 bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
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
        const dayPlan = weekPlan.find(day => day.date === dayId) || { id: dayId, date: dayId, meals: [] };

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
                  const meal = dayPlan.meals.find((m) => m.category === category);
                  const mealIndex = meal ? dayPlan.meals.indexOf(meal) : -1;
                  const isMealExpanded = expandedMeals[`${dayId}-${category}`];

                  return (
                    <div key={`${dayId}-${category}`} className="bg-white bg-opacity-10 rounded-md overflow-hidden">
                      {meal ? (
                        <>
                          <div className="w-full flex justify-between items-center p-2 hover:bg-white hover:bg-opacity-20 transition-colors">
                            <span className="font-medium">{meal.name || category}</span>
                            <button
                              onClick={() => toggleMeal(dayId, category)}
                              className="focus:outline-none"
                            >
                              {isMealExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                          {isMealExpanded && (
                            <div className="p-2 space-y-2">
                              <input
                                type="text"
                                value={meal.name}
                                onChange={(e) => updateMeal(dayId, mealIndex, { ...meal, name: e.target.value })}
                                className="w-full p-2 bg-transparent border-b border-white text-white placeholder-gray-300"
                                placeholder="Meal name"
                              />
                              <div className="relative">
                                <input
                                  ref={inputRef}
                                  type="text"
                                  value={newIngredient}
                                  onChange={(e) => handleIngredientChange(e.target.value)}
                                  className="w-full p-2 bg-transparent border-b border-white text-white placeholder-gray-300"
                                  placeholder="Add ingredient"
                                />
                                {filteredIngredients.length > 0 && (
                                  <ul
                                    ref={dropdownRef}
                                    className="fixed z-50 w-64 bg-white rounded-md mt-1 max-h-60 overflow-auto shadow-lg ingredient-dropdown"
                                    style={{
                                      top: inputRef.current ? inputRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
                                      left: inputRef.current ? inputRef.current.getBoundingClientRect().left + window.scrollX : 0,
                                    }}
                                  >
                                    {filteredIngredients.map((ingredient, index) => (
                                      <li
                                        key={index}
                                        className="p-2 hover:bg-gray-200 cursor-pointer text-gray-800"
                                        onClick={() => handleAddIngredient(dayId, mealIndex, ingredient)}
                                      >
                                        {ingredient}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {meal.ingredients.map((ingredient, idx) => (
                                  <span key={`${dayId}-${category}-${idx}`} className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm flex items-center">
                                    {ingredient}
                                    <button
                                      onClick={() => {
                                        const newIngredients = [...meal.ingredients];
                                        newIngredients.splice(idx, 1);
                                        updateMeal(dayId, mealIndex, { ...meal, ingredients: newIngredients });
                                      }}
                                      className="ml-2 text-purple-900 hover:text-purple-700"
                                    >
                                      <X size={14} />
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <button
                                onClick={() => deleteMeal(dayId, mealIndex)}
                                className="text-red-300 hover:text-red-100 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => addMeal(dayId, { name: '', category, calories: 0, ingredients: [] })}
                          className="w-full p-2 flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          <Plus size={20} className="mr-1" /> Add {category}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyPlanner;