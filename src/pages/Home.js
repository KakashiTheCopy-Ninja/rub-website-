// src/pages/Home.js - Complete Home page with all sections
import React from 'react';
import Hero from '../components/home/Hero';
import Products from '../components/home/Products';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/common/Newsletter';
import Stats from '../components/common/Stats';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Products />
      <Services />
      <Stats />
<Testimonials />
<Newsletter />
    </div>
  );
};

export default Home;