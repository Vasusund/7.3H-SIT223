import React from 'react';
import TutorialCard from './TutorialCard';

const tutorials = [
  {
    title: 'JS6 Essentials',
    description: 'e.g., JS6',
    rating: 5,
    username: 'codeGuy',
    image: 'https://picsum.photos/id/1044/200/120' // fixed ID for stability
  },
  {
    title: 'React Router Guide',
    description: 'e.g., React Router',
    rating: 5,
    username: 'devQueen',
    image: 'https://picsum.photos/200?1'
  },
  {
    title: 'Express Overview',
    description: 'e.g., Express',
    rating: 4.9,
    username: 'nodeNinja',
    image: 'https://picsum.photos/200?1'
  }
];

function FeaturedTutorials() {
  return (
    <section>
      <h2>Featured Tutorials</h2>
      <div className="card-grid" style={{ display: 'flex', gap: '1rem' }}>
        {tutorials.map((tutorial, index) => (
          <TutorialCard 
            key={index} 
            data={tutorial} 
          />
        ))}
      </div>
      <button>See all tutorials</button>
    </section>
  );
}

export default FeaturedTutorials;
