import React from 'react';

const Step1BasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="step">
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required />
      </label>
      <label>
        Category:
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Electronics">Electronics</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Furniture">Real Estate</option>
        </select>
      </label>
    </div>
  );
};

export default Step1BasicInfo;
