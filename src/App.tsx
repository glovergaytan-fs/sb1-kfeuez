import React, { useState, useEffect } from 'react';
import WeeklyPlanner from './components/WeeklyPlanner';
import WeeklyCalendar from './components/WeeklyCalendar';
import ShoppingList from './components/ShoppingList';
import BottomNavigation from './components/BottomNavigation';
import NutritionSummary from './components/NutritionSummary';
import UserProfile from './components/UserProfile';
import { Meal, DayPlan } from './types';
import { Utensils, Calendar, ShoppingBag, PieChart, User, Sun, Moon } from 'lucide-react';

function App() {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    const savedPlan = localStorage.getItem('weekPlan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });
  const [activeTab, setActiveTab] = useState('planner');
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState<() => void>(() => {});

  useEffect(() => {
    localStorage.setItem('weekPlan', JSON.stringify(weekPlan));
  }, [weekPlan]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addMeal = (date: string, meal: Meal) => {
    setWeekPlan(prevWeekPlan => {
      const newWeekPlan = [...prevWeekPlan];
      const dayIndex = newWeekPlan.findIndex(day => day.date === date);
      if (dayIndex !== -1) {
        newWeekPlan[dayIndex].meals.push(meal);
      } else {
        newWeekPlan.push({
          id: date,
          date: date,
          meals: [meal]
        });
      }
      return newWeekPlan;
    });
  };

  const updateMeal = (date: string, mealIndex: number, updatedMeal: Meal) => {
    setWeekPlan(prevWeekPlan => {
      const newWeekPlan = [...prevWeekPlan];
      const dayIndex = newWeekPlan.findIndex(day => day.date === date);
      if (dayIndex !== -1) {
        newWeekPlan[dayIndex].meals[mealIndex] = updatedMeal;
      }
      return newWeekPlan;
    });
  };

  const deleteMeal = (date: string, mealIndex: number) => {
    setConfirmationCallback(() => () => {
      setWeekPlan(prevWeekPlan => {
        const newWeekPlan = [...prevWeekPlan];
        const dayIndex = newWeekPlan.findIndex(day => day.date === date);
        if (dayIndex !== -1) {
          newWeekPlan[dayIndex].meals.splice(mealIndex, 1);
          if (newWeekPlan[dayIndex].meals.length === 0) {
            newWeekPlan.splice(dayIndex, 1);
          }
        }
        return newWeekPlan;
      });
    });
    setShowConfirmation(true);
  };

  const clearAllData = () => {
    setConfirmationCallback(() => () => {
      localStorage.removeItem('weekPlan');
      setWeekPlan([]);
      setCurrentWeekOffset(0);
    });
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    confirmationCallback();
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'planner':
        return (
          <WeeklyPlanner
            weekPlan={weekPlan}
            addMeal={addMeal}
            updateMeal={updateMeal}
            deleteMeal={deleteMeal}
            currentWeekOffset={currentWeekOffset}
            setCurrentWeekOffset={setCurrentWeekOffset}
          />
        );
      case 'calendar':
        return (
          <WeeklyCalendar
            weekPlan={weekPlan}
            currentWeekOffset={currentWeekOffset}
            setCurrentWeekOffset={setCurrentWeekOffset}
          />
        );
      case 'shopping':
        return <ShoppingList weekPlan={weekPlan} />;
      case 'nutrition':
        return <NutritionSummary weekPlan={weekPlan} />;
      case 'profile':
        return <UserProfile clearAllData={clearAllData} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white`}>
      <div className="max-w-md mx-auto pb-20">
        <header className="flex justify-between items-center py-4 px-4">
          <div className="flex items-center">
            <Utensils size={32} className="mr-2" />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>
        <main className="p-4">
          {renderContent()}
        </main>
      </div>
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { id: 'planner', label: 'Planner', icon: <Utensils size={24} /> },
          { id: 'calendar', label: 'Calendar', icon: <Calendar size={24} /> },
          { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={24} /> },
          { id: 'nutrition', label: 'Nutrition', icon: <PieChart size={24} /> },
          { id: 'profile', label: 'Profile', icon: <User size={24} /> },
        ]}
      />
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg text-black">
            <p className="mb-4">Are you sure you want to perform this action?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;