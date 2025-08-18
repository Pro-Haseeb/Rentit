// src/components/Categories.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg',
  },
  {
    name: 'Vehicles',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
  },
  {
    name: 'Real Estate',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/explore?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="category-section">
      <h2 className="category-heading">Explore Categories</h2>
      <div className="category-container">
        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className="image-wrapper">
              <img src={cat.image} alt={cat.name} className="category-img" />
              <div className="overlay">
                <span className="overlay-text">Explore {cat.name}</span>
              </div>
            </div>
            <h3 className="category-title">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
