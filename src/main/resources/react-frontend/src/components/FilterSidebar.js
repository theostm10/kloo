import React from 'react';
import '../styles/FilterSidebar.css';

function FilterSidebar({ onSortChange, onFilterChange }) {
  return (
    <div className="filter-sidebar">
      <h3>Filter & Sort</h3>
      <div>
        <label>Sort by Price:</label>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type="number"
          placeholder="Max price"
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
        />
      </div>
    </div>
  );
}

export default FilterSidebar;
