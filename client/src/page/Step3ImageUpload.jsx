import React from 'react';

const Step3ImageUpload = ({ formData, handleChange }) => {
  return (
    <div className="step">
      <label>
        Product Image:
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      </label>
      {formData.image && (
        <div className="image-preview">
          <img src={URL.createObjectURL(formData.image)} alt="Preview" />
        </div>
      )}
      <p className="note-warning">
        ⚠️ Upload landscape image at least 800x600 for better display.
      </p>
    </div>
  );
};

export default Step3ImageUpload;
