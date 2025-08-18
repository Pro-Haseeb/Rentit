// src/components/AboutUs.jsx
import React from 'react';
import './AboutUs.css';

const teamMembers = [
  {
    name: 'Haseeb Mushtaq',
    image: '/team/haseeb.jpg',
    role: 'MERN Stack Developer',
  },
  {
    name: 'Awais Ali',
    image: '/team/awais.jpg',
    role: 'UI/UX Designer',
  },
  {
    name: 'Muhammad Ahmad',
    image: '/team/ahmad.jpg',
    role: 'React JS Developer',
  },
];

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Intro Section */}
      <section className="intro-hero">
        <h1>About Rentit.pk</h1>
        <p>
          Rentit.pk is Pakistan’s most reliable and smart rental platform. We connect owners and renters for everyday needs — whether it's electronics, vehicles, or tools — all in one place.
        </p>
      </section>

      {/* Team Section */}
      <section className="about-hero">
        <h1>Meet Our People Behind Rentit.pk</h1>
        <p>Our team is committed to building a smarter rental experience for everyone.</p>
      </section>

      <section className="team-section">
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.image} alt={member.name} className="team-img" />
              <p className="team-name">{member.name}</p>
              <p className="team-role">{member.role}</p> {/* New Description */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
