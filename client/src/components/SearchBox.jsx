// src/components/SearchBox.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbox.css';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // navigate to explore with search query in URL
      navigate(`/explore?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search items, products..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="explore-btn" onClick={handleSearch}>Explore</button>
    </div>
  );
};

export default SearchBox;
