import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllRentalsPanel.css';
import { FaUser, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';
import API from "../../AxiosConfig";

const AdminAllRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("http://localhost:5000/api/rentals/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRentals(res.data.rentals);
      } catch (error) {
        console.error("Failed to fetch rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const now = new Date();

  const approvedRentals = rentals.filter(r => r.productId && r.status === "approved");
  const ongoing = approvedRentals.filter(r => new Date(r.endDate) > now);
  const endingSoon = approvedRentals.filter(r => {
    const endDate = new Date(r.endDate);
    const daysLeft = (endDate - now) / (1000 * 60 * 60 * 24);
    return daysLeft <= 3 && daysLeft > 0;
  });
  const expired = approvedRentals.filter(r => new Date(r.endDate) <= now);
  const rejected = rentals.filter(r => r.productId && r.status === "rejected");

  const renderRows = (list, statusClass, statusLabel) =>
    list.map(rental => (
      <tr key={rental._id}>
        <td>{rental.productId.title}</td>
        <td>
          {rental.productId.ownerId?.name}<br />
          <small>{rental.productId.ownerId?.email}</small>
        </td>
        <td>
          {rental.renterId?.name}<br />
          <small>{rental.renterId?.email}</small>
        </td>
        <td>{new Date(rental.startDate).toLocaleDateString()}</td>
        <td>{new Date(rental.endDate).toLocaleDateString()}</td>
        <td>
          <span className={`status-badge ${statusClass}`}>
            {statusLabel}
          </span>
        </td>
      </tr>
    ));

  return (
    <div className="admin-rentals-container">
      <h2><FaBoxOpen /> All Rentals</h2>
      <table className="admin-rentals-table">
        <thead>
          <tr>
            <th><FaBoxOpen /> Product</th>
            <th><FaUser /> Owner</th>
            <th><FaUser /> Renter</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ongoing.length > 0 && (
            <>
              <tr><td colSpan="6"><strong>🟢 Ongoing Rentals</strong></td></tr>
              {renderRows(ongoing, "approved", <><FaCheckCircle /> Ongoing</>)}
            </>
          )}

          {endingSoon.length > 0 && (
            <>
              <tr><td colSpan="6"><strong>🕓 Ending Soon (≤ 3 days)</strong></td></tr>
              {renderRows(endingSoon, "approved", <><FaCheckCircle /> Ending Soon</>)}
            </>
          )}

          {expired.length > 0 && (
            <>
              <tr><td colSpan="6"><strong>🔴 Expired Rentals</strong></td></tr>
              {renderRows(expired, "approved", <><FaCheckCircle /> Expired</>)}
            </>
          )}

          {rejected.length > 0 && (
            <>
              <tr><td colSpan="6"><strong>❌ Rejected Rentals</strong></td></tr>
              {renderRows(rejected, "rejected", "❌ Rejected")}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllRentals;
