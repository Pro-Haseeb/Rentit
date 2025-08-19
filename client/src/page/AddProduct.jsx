import React, { useState } from 'react';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Pricing from './Step2Pricing';
import Step3ImageUpload from './Step3ImageUpload';
import './AddProduct.css';
import axios from 'axios';
import API from "../axiosConfig";


const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    hasOffer: false,
    image: null
  });

  const nextStep = () => {
    if (step === 1) {
      const { title, description, category } = formData;
      if (!title || !description || !category) {
        alert("Please fill all required fields in Step 1.");
        return;
      }
    } else if (step === 2) {
      const { price } = formData;
      if (!price || isNaN(price) || parseFloat(price) <= 0) {
        alert("Please enter a valid price in Step 2.");
        return;
      }
    } else if (step === 3) {
      const { image } = formData;
      if (!image) {
        alert("Please upload an image in Step 3.");
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      await API.post('http://localhost:5000/api/products', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Product added successfully!');
      setStep(1);
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        hasOffer: false,
        image: null
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="multi-step-container">
      <h2 className="form-heading">Add New Product</h2>

      <div className="step-indicator">
        <span className={step === 1 ? 'active' : ''}>1</span>
        <span className={step === 2 ? 'active' : ''}>2</span>
        <span className={step === 3 ? 'active' : ''}>3</span>
      </div>

      {step === 1 && <Step1BasicInfo formData={formData} handleChange={handleChange} />}
      {step === 2 && <Step2Pricing formData={formData} handleChange={handleChange} />}
      {step === 3 && <Step3ImageUpload formData={formData} handleChange={handleChange} />}

      <div className="button-group">
        {step > 1 && <button onClick={prevStep}>← Back</button>}
        {step < 3 && <button onClick={nextStep}>Next →</button>}
        {step === 3 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default AddProduct;
