
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-grad1start to-grad1end py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div className="flex-1 text-center md:text-left space-y-4">
          <h1 className="text-xl md:text-6xl font-outfit font-bold text-grad4start">
            Multi Restaurant <span className="text-grad3start">Food Ordering & Delivery</span> Solution
          </h1>
          <p className="text-lg md:text-xl font-body text-grad4end">
            Build your own multi-restaurant online food ordering & delivery business with complete source code.
          </p>
          <div className="space-x-4 mt-4">
            <button className="bg-grad1end text-white px-4 py-2 rounded shadow hover:bg-grad3end">
              Buy Now →
            </button>
            <button className="bg-transparent border border-grad1end text-grad1end px-4 py-2 rounded hover:bg-grad3end hover:text-white">
              View Demo →
            </button>
          </div>
        </div>
        <div className=" mt-8 md:mt-0 ">
          <img 
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" 
            alt="Mobile UI" 
            className="w-72 rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
