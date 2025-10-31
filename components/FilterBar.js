import React from 'react';

const FilterBar = ({ cities, types, selectedCity, selectedType, onCityChange, onTypeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8">
      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700"
      >
        <option value="">Tutte le città</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 border border-gray-700"
      >
        <option value="">Tutti i tipi</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
