import React, { useState, useEffect } from 'react';
import { DayPlan } from '../types';
import { ShoppingBag, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface ShoppingListProps {
  weekPlan: DayPlan[];
}

interface CategoryMap {
  [key: string]: string[];
}

const categoryMap: CategoryMap = {
  'Fruits & Vegetables': ['apple', 'banana', 'carrot', 'lettuce', 'tomato', 'onion', 'garlic', 'potato', 'broccoli', 'spinach', 'cucumber', 'pepper', 'zucchini', 'eggplant', 'mushroom'],
  'Meat & Poultry': ['chicken', 'beef', 'pork', 'turkey', 'lamb', 'sausage', 'bacon', 'ham'],
  'Seafood': ['salmon', 'tuna', 'shrimp', 'cod', 'tilapia', 'crab', 'lobster', 'mussels'],
  'Dairy & Eggs': ['milk', 'cheese', 'yogurt', 'eggs', 'butter', 'cream', 'sour cream'],
  'Grains & Bread': ['bread', 'rice', 'pasta', 'cereal', 'oats', 'flour', 'quinoa', 'couscous'],
  'Canned & Packaged': ['beans', 'soup', 'sauce', 'noodles', 'broth', 'tomato paste', 'coconut milk'],
  'Spices & Condiments': ['salt', 'pepper', 'oregano', 'basil', 'cumin', 'paprika', 'cinnamon', 'ketchup', 'mustard', 'mayonnaise'],
  'Oils & Vinegars': ['olive oil', 'vegetable oil', 'coconut oil', 'vinegar', 'balsamic vinegar'],
  'Nuts & Seeds': ['almonds', 'walnuts', 'peanuts', 'cashews', 'sunflower seeds', 'chia seeds'],
  'Beverages': ['water', 'juice', 'soda', 'coffee', 'tea'],
  'Snacks': ['chips', 'crackers', 'nuts', 'cookies', 'popcorn'],
  'Baking': ['sugar', 'baking powder', 'baking soda', 'vanilla extract', 'chocolate chips'],
  'Frozen Foods': ['frozen vegetables', 'frozen fruits', 'ice cream', 'frozen pizza'],
  'Other': [],
};

const ShoppingList: React.FC<ShoppingListProps> = ({ weekPlan }) => {
  const [categorizedIngredients, setCategorizedIngredients] = useState<Record<string, Record<string, number>>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const ingredients = weekPlan
      .flatMap(day => day.meals)
      .flatMap(meal => meal.ingredients)
      .reduce((acc, ingredient) => {
        acc[ingredient.toLowerCase()] = (acc[ingredient.toLowerCase()] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const categorized: Record<string, Record<string, number>> = {};
    Object.entries(ingredients).forEach(([ingredient, count]) => {
      const category = Object.entries(categoryMap).find(([_, items]) => 
        items.some(item => ingredient.toLowerCase().includes(item))
      )?.[0] || 'Other';
      
      if (!categorized[category]) {
        categorized[category] = {};
      }
      categorized[category][ingredient] = count;
    });

    setCategorizedIngredients(categorized);
    setExpandedCategories(Object.keys(categorized).reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {} as Record<string, boolean>));
  }, [weekPlan]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const filteredCategories = Object.entries(categorizedIngredients).filter(([category, items]) => {
    return Object.keys(items).some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ShoppingBag size={24} className="mr-2" />
        Smart Shopping List
      </h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300"
        />
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>
      {filteredCategories.map(([category, items]) => (
        <div key={category} className="mb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex justify-between items-center bg-white bg-opacity-20 p-2 rounded-md mb-2"
          >
            <span className="font-medium">{category}</span>
            {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {expandedCategories[category] && (
            <ul className="space-y-2 pl-4">
              {Object.entries(items).filter(([ingredient]) => 
                ingredient.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(([ingredient, count]) => (
                <li key={ingredient} className="flex justify-between items-center bg-white bg-opacity-10 p-2 rounded-md">
                  <span className="font-medium">{ingredient}</span>
                  <span className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-sm">
                    x{count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;