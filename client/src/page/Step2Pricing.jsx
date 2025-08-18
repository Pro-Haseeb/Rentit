import React from 'react';

const Step2Pricing = ({ formData, handleChange }) => {
  return (
    <div className="step">
      <label>
        Price (PKR):
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      <label className="checkbox-label">
        <input  type="checkbox" name="hasOffer" checked={formData.hasOffer} onChange={handleChange} />
        Mark as Offer / Discount
      </label>
    </div>
  );
};

export default Step2Pricing;
