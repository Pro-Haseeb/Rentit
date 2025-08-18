import React, { useState } from 'react';
import './TutorialOverlay.css';

const TutorialOverlay = ({ onFinish }) => {
  const steps = [
    {
      title: "Welcome to Rentit.pk",
      desc: "This is your Home Page where you can explore all available rental categories and discover trending items.",
    },
    {
      title: "Explore Products",
      desc: "Use filters to find rental items by category, price, or name. Click 'Rent Now' to submit a request.",
    },
    {
      title: "Add Your Product",
      desc: "You can rent out your own items. Go to 'Add Product', upload image, details, and list it for others.",
    },
    {
      title: "Dashboard Overview",
      desc: "'My Products' shows your listed items. 'My Rentals' are your ongoing rentals. 'Rental Requests' show incoming rental demands.",
    },
    {
      title: "Contact & Support",
      desc: "Need help? Click the 'Contact Us' button (bottom right sticky) to file a complaint or ask questions.",
    }
  ];

  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleNext = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      if (index < steps.length - 1) {
        setIndex(index + 1);
        setFadeClass('fade-in');
      } else {
        onFinish();
      }
    }, 300); // Match CSS duration
  };

  const handleSkip = () => {
    onFinish();
  };

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-blur" />
      <div className={`tutorial-box ${fadeClass}`}>
        <h1 className="tutorial-main-title">Rentit.pk Tour</h1>
        <h2>{steps[index].title}</h2>
        <p>{steps[index].desc}</p>
        <div className="tutorial-buttons">
          <button className="skip-btn" onClick={handleSkip}>Skip</button>
          <button className="next-btn" onClick={handleNext}>
            {index === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
