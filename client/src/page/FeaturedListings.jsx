import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeaturedListings.css';

const OffersSection = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/offers');
        setOffers(res.data.products);
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  const handleCardClick = (product) => {
    // Navigate to explore with category as query param
    navigate(`/explore?category=${encodeURIComponent(product.category)}`);
  };

  return (
    <div className="offers-section">
      <h2 className="offers-heading">Hot Offers & Discounts</h2>
      <div className="offers-container">
        {offers.slice(0, 3).map((product, index) => (
          <div className="offer-card" key={index} onClick={() => handleCardClick(product)}>
            <img src={`http://localhost:5000${product.image}`} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Rs. {product.price}</p>
            <span className="offer-badge">Special Offer</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSection;
