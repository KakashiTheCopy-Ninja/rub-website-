// src/pages/Home.js - Replace your Home.js with this
import React from 'react';
import Hero from '../components/home/Hero';
import Products from '../components/home/Products';
import Services from '../components/home/Services';
import About from '../components/home/About';

const Home = () => {
  return (
    <div>
      <Hero />
      <Products />
      <Services />
      <About />
    </div>
  );
};

export default Home;