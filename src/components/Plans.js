import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Plans() {
  const navigate = useNavigate();

  return (
    <div className="plans-page">
      <h1>Choose Your Plan</h1>
      
      <div className="plans-container">
        {/* Free Plan */}
        <div className="plan-card">
          <h2>Free</h2>
          <p className="price">$0 / month</p>
          <ul>
            <li>Access to articles</li>
            <li>Basic support</li>
          </ul>
          <button className="btn-free" onClick={() => alert('You are on Free Plan')}>Select</button>
        </div>

        {/* Premium Plan */}
        <div className="plan-card premium">
          <h2>Premium</h2>
          <p className="price">$9.99 / month</p>
          <ul>
            <li>Custom themes & banners</li>
            <li>Analytics Dashboard</li>
            <li>Priority Support</li>
          </ul>
          <button className="btn-premium" onClick={() => navigate('/payment')}>Select</button>
        </div>
      </div>
    </div>
  );
}

export default Plans;
