import React from 'react';
import ArticleCard from './ArticleCard';

const articles = [
  {
    title: 'Intro to React',
    description: 'e.g., React OR Vue',
    rating: 5,
    author: 'John Doe',
    image: 'https://picsum.photos/200?1'
  },
  {
    title: 'NodeJS Basics',
    description: 'e.g., NodeJS',
    rating: 5,
    author: 'Jane Smith',
    image: 'https://picsum.photos/200?1'
  },
  {
    title: 'React Hooks',
    description: 'e.g., React Hooks',
    rating: 5,
    author: 'Alex Johnson',
    image: 'https://picsum.photos/200?1'
  }
];

function FeaturedArticles() {
  return (
    <section>
      <h2>Featured Articles</h2>
      <div className = "card-grid" style={{ display: 'flex', gap: '1rem' }}>
        {articles.map((article, index) => (
          <ArticleCard key={index} data={article} />
        ))}
      </div>
      <button>See all articles</button>
    </section>
  );
}

export default FeaturedArticles;
