import React from 'react';
import './PrivacyPolicy.css'; // optional for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy" style={{ padding: '40px', color: 'white', background: '#000', minHeight: '100vh' }}>
      <h1 style={{ color: '#00cc66' }}>Privacy Policy</h1>
      <p>
        At <strong>Rentit.pk</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use,
        and protect your personal information.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>Personal information like name, email, phone, and address</li>
        <li>Product listing and rental activity</li>
        <li>Device and browser data</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and improve our rental services</li>
        <li>To communicate with you about rentals and updates</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We use encryption, secure servers, and strict access controls to protect your data.
      </p>

      <h2>4. Third-Party Sharing</h2>
      <p>
        We never sell your data. We may share it with trusted service providers only when necessary for platform functionality.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You can access, update, or delete your data anytime by contacting us at <strong>rentit83@gmail.com</strong>.
      </p>

      <h2>6. Changes to this Policy</h2>
      <p>
        We may update this policy from time to time. We encourage you to check this page regularly.
      </p>

      <p style={{ marginTop: '20px' }}><strong>Last updated:</strong> July 30, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
