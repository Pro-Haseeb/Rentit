import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './Explore.css';
import { useLocation } from 'react-router-dom';
import RentForm from './RentForm'; // ✅ Import RentForm
import { useNavigate } from 'react-router-dom';
import API from "../axiosConfig";


const Explore = () => {
  const [products, setProducts] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  // ✅ Rent Form States
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [renterId, setRenterId] = useState("666exampleUserId"); TODO: Replace with actual user ID

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('http://localhost:5000/api/products');
        setProducts(res.data.products);
        console.log(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


  const filtered = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const groupedProducts = filtered.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="explore-wrapper">
      <h2 className="explore-heading">Explore Products by Category</h2>

      {/* 🔍 Filters */}
      <div className="filters" style={{ marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(products.map(p => p.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* 📦 Grouped Product Cards */}
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="category-section">
          <div className="category-header">
            <h3 className="category-title">{category}</h3>
          </div>

          <div className="category-items">
            {(expandedCategories.includes(category) ? items : items.slice(0, 3)).map(product => (
              <div key={product._id} className="item-card">
                <img src={product.image} alt={product.title} />
                <div className="item-info">
                  <h3>{product.title}</h3>
                  <p className="price">PKR {product.price}</p>
                  <p className="desc">{product.description.slice(0, 60)}...</p>

                  {/* ✅ Rent Now Button */}
                  <button
  className="rent-now-btn"
  onClick={() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      setSelectedProduct(product);
      setShowForm(true);
    }
  }}
>
  Rent Now
</button>

                </div>
              </div>
            ))}

            {/* 🔘 See More / Less */}
            {items.length > 3 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <button onClick={() => toggleCategory(category)} className="see-more">
                  {expandedCategories.includes(category) ? 'See Less' : 'See More'}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 🧾 Rent Form Modal */}
{showForm && selectedProduct && (
  <>
{console.log("🟢 Selected Product:", selectedProduct)}
    {console.log("🟢 Renter ID:", JSON.parse(localStorage.getItem("user"))?._id)}

  <RentForm
    product={selectedProduct}
    renterId={JSON.parse(localStorage.getItem("user"))?._id} // ✅ correct ObjectId
    onClose={() => {
      setShowForm(false);
      setSelectedProduct(null);
    }}
  />
  </>
)}


    </div>
  );
};

export default Explore;
