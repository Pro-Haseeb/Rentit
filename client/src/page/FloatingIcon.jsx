import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa'; // ✅ new icon
import { useNavigate } from 'react-router-dom';
import './FloatingIcon.css';

const FloatingContact = () => {
  const navigate = useNavigate();

  return (
    <div className="floating-contact-icon" onClick={() => navigate('/contact')}>
      <FaRegCommentDots size={30} />
    </div>
  );
};

export default FloatingContact;
