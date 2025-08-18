import React, { useState,useEffect } from "react";
import axios from "axios";
import "./RentForm.css";

const RentForm = ({ product, renterId, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
const [total, setTotal] = useState(0);
const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
  alert("Please agree to the terms before submitting the request.");
  return;
}
    // setLoading(true);
 const today = new Date().setHours(0, 0, 0, 0); // today date, midnight
  const start = new Date(startDate).setHours(0, 0, 0, 0);
  const end = new Date(endDate).setHours(0, 0, 0, 0);

  if (start < today) {
    alert("Start date cannot be in the past.");
    return;
  }

  if (start > end) {
    alert("Start date cannot be after end date.");
    return;
  }

    const token = localStorage.getItem("token");
console.log("PRODUCT:", product);
console.log("CreatedBy:", product.createdBy);
console.log("CreatedBy._id:", product.createdBy?._id);
console.log("RenterId (user._id):", renterId);

    try {
      await axios.post(
        "http://localhost:5000/api/rentals",
        {
          productId: product._id,
          ownerId: product.createdBy?._id || product.createdBy, 
          renterId,                 
          startDate,
          endDate,
          address,
          message
        },
      {
        headers: {
        Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
         }
       );
  
      alert("Rental request sent!");
      onClose(); // Close the modal
    } catch (error) {
  console.error("❌ Rental Submit Error:", error.response?.data || error.message);
  
  const backendMessage = error.response?.data?.message;

  if (backendMessage?.includes("already booked")) {
    alert("❌ Selected dates are not available for this product. Please choose different dates.");
  } else {
    alert(backendMessage || "Failed to submit rental request");
  }
}


  };

  const calculateTotal = () => {
  if (!startDate || !endDate) return;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (days > 0) {
    const totalPrice = days * parseInt(product.price);
    setTotal(totalPrice);
  } else {
    setTotal(0);
  }
};

useEffect(() => {
  calculateTotal();
}, [startDate, endDate]);



  

  return (
    <div className="rent-form-overlay">
      <div className="rent-form-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="rent-form-content">
          {/* <img src={product.image || product.imageUrl} alt={product.title} /> */}

          <h2>{product.title}</h2>
          <h3>{product.price}   PKR Per Day</h3>
          <form onSubmit={handleSubmit}>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />

            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />

            <p><strong>Total Rent:</strong> {total} PKR</p>

            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label>Message (Optional):</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label>Description:</label>
             <textarea
              value={product.description}
              readOnly
              className="description-box"
            />

            <div className="agreement-checkbox">
  <input
    type="checkbox"
    id="agree"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
  />
  <label htmlFor="agree">
    I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Agreement</a> and understand I am legally responsible
    for the product.
  </label>
</div>


            <button type="submit" >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentForm;
