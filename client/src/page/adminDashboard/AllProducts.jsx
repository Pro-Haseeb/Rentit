// src/pages/AdminAllProducts.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllProducts.css";
import { FaTrash, FaBan, FaCheckCircle } from "react-icons/fa";
import API from "../axiosConfig";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  // 🔄 Fetch all products with owner info (createdBy populated)
  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products); // 👈 assuming backend sends { products: [...] }
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    }
  };

  // ❌ Delete a product
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/products/admin/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllProducts(); // Refresh list after delete
    } catch (err) {
      console.error("❌ Error deleting product", err);
    }
  };

  // 🔁 Toggle block/unblock product
  const handleToggleBlock = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/products/admin/${productId}/block`,
        { blocked: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAllProducts(); // Refresh list after update
    } catch (err) {
      console.error("❌ Error toggling product block status", err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="admin-products-container">
      <h2>All Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Owner</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className={prod.blocked ? "blocked-row" : ""}>
              <td>{prod.title}</td>
              <td>{prod.category}</td>
              <td>Rs {prod.price}</td>
              <td>
                {prod.createdBy?.name} ({prod.createdBy?.email})
              </td>
              <td>
                {prod.deadline
                  ? new Date(prod.deadline).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{prod.blocked ? "Blocked" : "Active"}</td>
              <td>
  <div className="action-buttons">
    <button
      className={prod.blocked ? "unblock-btn" : "block-btn"}
      onClick={() => handleToggleBlock(prod._id, prod.blocked)}
    >
      {prod.blocked ? (
        <>
          <FaCheckCircle /> Unblock
        </>
      ) : (
        <>
          <FaBan /> Block
        </>
      )}
    </button>
    <button className="delete-btn" onClick={() => handleDelete(prod._id)}>
      <FaTrash /> Delete
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProducts;
