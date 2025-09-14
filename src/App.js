import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import HeroImage from './components/HeroImage';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import NewsletterSignUp from './components/NewsletterSignup';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import QuestionsPage from './components/QuestionsPage';
import 'semantic-ui-css/semantic.min.css';
import Plans from './components/Plans';
import Payment from './components/Payment';


import './styles.css';

function App() {
  return (
    <div className="app-container">
      <HeaderBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <HeroImage />
              <FeaturedArticles />
              <FeaturedTutorials />
              <NewsletterSignUp />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<PostForm />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/plans" element={<Plans />} /> {/* your plans page */}
          <Route path="/payment" element={<Payment />} /> {/* your payment page */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
