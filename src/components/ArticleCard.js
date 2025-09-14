import React from 'react';

function ArticleCard({ data }) {
  return (
    <div className = "card" >
      <img src={data.image} alt="Article" width="100%" />
      <h4>{data.title}</h4>
      <p>{data.description}</p>
      <p>⭐ {data.rating} — {data.author}</p>
    </div>
  );
}

export default ArticleCard;
