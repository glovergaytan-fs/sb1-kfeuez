import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ingredientDatabase from '../data/ingredientDatabase';

interface IngredientSearchProps {
  appId: string;
  appKey: string;
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({ appId, appKey }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchIngredient = () => {
    if (!query.trim()) {
      setError('Please enter an ingredient to search');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const filteredResults = ingredientDatabase.filter(ingredient =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } catch (err) {
      setError('An error occurred while searching for ingredients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an ingredient"
          className="flex-grow p-2 bg-white bg-opacity-20 rounded-l-md text-white placeholder-gray-300"
        />
        <button
          onClick={searchIngredient}
          className="bg-yellow-400 text-purple-900 p-2 rounded-r-md hover:bg-yellow-300 transition-colors"
          disabled={loading}
        >
          <Search size={24} />
        </button>
      </div>
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {results.map((ingredient, index) => (
          <div key={index} className="bg-white bg-opacity-10 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow">
            <p className="text-sm font-semibold">{ingredient}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;