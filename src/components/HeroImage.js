import React from 'react';
import mynameImage from '../myname.jpg';

function HeroImage() {
  return (
    <div className="hero">
      <img src={mynameImage} alt="Hero" className="hero-image" />
    </div>
  );
}

export default HeroImage;
