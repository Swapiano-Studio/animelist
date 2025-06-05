import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import TrendingNow from './TrendingNow';
import TopViewShow from './TopViewShow';
import Newsletter from './Newsletter';

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <HeroSection />
      <TrendingNow/>
      <TopViewShow />
      <Newsletter />
    </div>
  );
};

export default HomePage;