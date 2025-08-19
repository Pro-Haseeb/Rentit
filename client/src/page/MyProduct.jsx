import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyProduct.css';
import API from "../axiosConfig";
const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedData, setEditedData] = useState({ title: '', price: '', category: '' });

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('http://localhost:5000/api/products/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching my products:', err);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditedData({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await API.put(
        `http://localhost:5000/api/products/update/${productId}`,
        editedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingProduct(null);
      fetchMyProducts(); // refresh data
    } catch (err) {
      console.error('Error updating product:', err);
      alert("❌ Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await API.delete(`http://localhost:5000/api/products/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Product deleted");
      fetchMyProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div className="my-products-page">
      <h2 className="page-heading">📦 My Listed Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products added yet.</p>
      ) : (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price (PKR)</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.title}
                      className="product-img"
                    />
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <input
                        name="title"
                        value={editedData.title}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.title
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <input
                        name="price"
                        value={editedData.price}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <input
                        name="category"
                        value={editedData.category}
                        onChange={handleInputChange}
                      />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td>
                    {editingProduct === product._id ? (
                      <>
                        <button
                          onClick={() => handleSave(product._id)}
                          className="save-btn"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="cancel-btn"
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(product)}
                          className="edit-btn"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="delete-btn"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
