import React from 'react';

function TutorialCard({ data }) {
  return (
    <div className='card' style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <img src={data.image} alt="Tutorial" width="100%" />
      <h4>{data.title}</h4>
      <p>{data.description}</p>
      <p>⭐ {data.rating} — {data.username}</p>
    </div>
  );
}

export default TutorialCard;
