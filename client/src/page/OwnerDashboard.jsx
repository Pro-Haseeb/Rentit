import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./OwnerDashboard.css";
import {
  FaCheck,
  FaTimes,
  FaUndo,
  FaEye,
  FaClock,
  FaBan,
  FaClipboardList
} from "react-icons/fa";
import API from "../axiosConfig";

const OwnerDashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);

  useEffect(() => {
    const fetchOwnerRentals = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.get(`http://localhost:5000/api/rentals/owner/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.rentals) {
          setRentals(res.data.rentals);
        } else {
          console.error("No rentals found for this owner");
        }
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchOwnerRentals();
  }, []);

  const updateStatus = async (rentalId, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        `http://localhost:5000/api/rentals/${rentalId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRentals((prev) =>
        prev.map((r) => (r._id === rentalId ? { ...r, status } : r))
      );

      alert(`Rental ${status} successfully!`);
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update status");
    }
  };

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

  return (
    <div className="owner-dashboard">
      <h2><FaClipboardList /> Rental Requests</h2>

      {rentals.length === 0 ? (
        <p>No rental requests found.</p>
      ) : (
        <table className="rental-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Renter</th>
              <th>Dates</th>
              <th>Address</th>
              <th>Message</th>
              <th>Status</th>
              <th>View</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>
                  <img
                    src={rental.productId?.image || "/placeholder.png"}
                    alt="Product"
                    width="80"
                    height="60"
                  />
                </td>
                <td>{rental.productId?.title}</td>
                <td>{rental.renterId?.name}<br />({rental.renterId?.email})</td>
                <td>
                  {rental.startDate?.slice(0, 10)} → {rental.endDate?.slice(0, 10)}
                  {isDeadlinePassed(rental.endDate) ? (
                    <span className="deadline-passed">
                      <FaBan color="red" /> Expired
                    </span>
                  ) : isDeadlineNear(rental.endDate) && (
                    <span className="deadline-warning">
                      <FaClock color="orange" /> Ending Soon
                    </span>
                  )}
                </td>
                <td>{rental.address}</td>
                <td>{rental.message || "No message"}</td>
                <td>
                  <span className={`status ${rental.status}`}>{rental.status}</span>
                </td>
                <td>
                  <button className="icon-btn view-btn" onClick={() => setSelectedRental(rental)}>
                    <FaEye color="#007bff" />
                  </button>
                </td>
                <td>
                  {rental.status === "pending" ? (
                    <>
                      <button className="icon-btn approve" onClick={() => updateStatus(rental._id, "approved")}>
                        <FaCheck color="green" />
                      </button>
                      <button className="icon-btn reject" onClick={() => updateStatus(rental._id, "rejected")}>
                        <FaTimes color="red" />
                      </button>
                    </>
                  ) : (
                    <button className="icon-btn undo" onClick={() => updateStatus(rental._id, "pending")}>
                      <FaUndo color="orange" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedRental && (
        <div className="modal-overlay" onClick={() => setSelectedRental(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Rental Details</h2>
            <p><strong>Product:</strong> {selectedRental.product?.title}</p>
            <p><strong>Renter Name:</strong> {selectedRental.renterId?.name}</p>
            <p><strong>Start:</strong> {new Date(selectedRental.startDate).toLocaleDateString()}</p>
            <p><strong>End:</strong> {new Date(selectedRental.endDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedRental.status}</p>
            <p><strong>Contact:</strong> {selectedRental.renterId?.phone || "N/A"}</p>
            <p><strong>Message:</strong> {selectedRental.message || "N/A"}</p>
            <button onClick={() => setSelectedRental(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
