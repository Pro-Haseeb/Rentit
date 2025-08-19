import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
} from 'react-icons/fa';
import './MyRental.css';

import API from "../axiosConfig";

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchMyRentals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('http://localhost:5000/api/rentals/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedRentals = res.data.rentals.sort((a, b) => {
          return new Date(b.startDate || b.createdAt) - new Date(a.startDate || a.createdAt);
        });

        setRentals(sortedRentals);
      } catch (err) {
        console.error('Error fetching rentals:', err);
      }
    };

    fetchMyRentals();
  }, []);

  const isDeadlineNear = (endDate) => {
    const today = new Date();
    const deadline = new Date(endDate);
    const timeDiff = deadline.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff <= 2;
  };

  const isDeadlinePassed = (endDate) => {
    return new Date() > new Date(endDate);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle style={{ color: 'limegreen' }} />;
      case 'pending':
        return <FaHourglassHalf style={{ color: 'orange' }} />;
      case 'rejected':
        return <FaTimesCircle style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="my-rentals-page">
      <h2>📋 My Rental Requests</h2>

      {rentals.length === 0 ? (
        <p>You haven't submitted any rental requests yet.</p>
      ) : (
        <div className="rental-table-container">
          <table className="rental-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental._id} className={rental.status === 'rejected' ? 'rejected-row' : ''}>
                  <td>{rental.productId?.title || 'Product Removed'}</td>
                  <td>
                    <span className={`status-badge ${rental.status}`}>
                      {getStatusIcon(rental.status)} {rental.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {rental.startDate?.slice(0, 10)} → {rental.endDate?.slice(0, 10)}{' '}
                    {isDeadlinePassed(rental.endDate) ? (
                      <span className="badge expired">
                        <FaTimesCircle /> Expired
                      </span>
                    ) : isDeadlineNear(rental.endDate) ? (
                      <span className="badge warning">
                        <FaExclamationTriangle /> Ending Soon
                      </span>
                    ) : (
                      <span className="badge active">
                        <FaClock /> Ongoing
                      </span>
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

export default MyRentals;
