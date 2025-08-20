// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import Searchbox from '../components/SearchBox';
import ImageSlider from '../components/ImageSlider';
import Categories from '../components/Categories';
import FeatureListing from './FeaturedListings';
import TutorialOverlay from '../page/TutorialOverlay';
import { dismissTutorial } from '../api/tutorialApi';

const Home = () => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser && storedUser.firstLogin) {
    setShowTutorial(true);
  }
  setUser(storedUser);
}, []);


  const handleTutorialFinish = async () => {
    await dismissTutorial(); // backend update
    setShowTutorial(false);

    const updatedUser = { ...user, firstLogin: false };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <div>
      {/* <Navbar /> */}
      <Searchbox />
      <ImageSlider />
      <Categories />
      <FeatureListing />
      
      {showTutorial && <TutorialOverlay onFinish={handleTutorialFinish} />}
    </div>
  );
};

export default Home;
