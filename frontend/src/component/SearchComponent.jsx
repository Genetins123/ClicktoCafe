import { useState, useEffect } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (q) => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const resFoods = await fetch(`http://localhost:5000/api/foods?search=${q}`);
      const resRestaurants = await fetch(`http://localhost:5000/api/restaurants?search=${q}`);

      const foods = await resFoods.json();
      const restaurants = await resRestaurants.json();

      setSuggestions([
        ...foods.map((f) => ({ type: 'Food', name: f.name })),
        ...restaurants.map((r) => ({ type: 'Restaurant', name: r.name })),
      ]);
    } catch (err) {
      console.error('Error fetching search data:', err);
    }
  };

  const handleInputChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    handleSearch(q);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for foods or restaurants..."
        className="bg-[#0f172a] text-sm text-white pl-10 pr-4 py-2 rounded-lg w-72 focus:outline-none"
      />

      {suggestions.length > 0 && (
        <div className="absolute bg-[#292525] shadow-md rounded w-full mt-1 z-10 max-h-60 overflow-auto">
          {suggestions.map((s, index) => (
            <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
              <span className="font-semibold">{s.type}:</span> {s.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
