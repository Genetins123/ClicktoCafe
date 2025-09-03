import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';

// 1. Import the image file
import homeBg from '../assets/home-bg.webp'; // Update this path if your image is elsewhere
import order from '../assets/order-icon.webp'
import delivery from '../assets/delivery-icon.webp'
import enjoy from '../assets/enjoy-icon.webp'
const HeroSection = () => {
  return (
    <>
    
    <section className="relative bg-white min-h items-center cover justify-center mt-10 mb-10 py-16 overflow-hidden">

      {/* Background with the imported image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${homeBg})` }}
      ></div>

      {/* Other background elements (you can remove or keep these) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-400 opacity-20 transform skew-x-12"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-400 opacity-20 transform -skew-x-12"></div>

      {/* Main content */}
      <div className="relative z-10 text-center p-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">ClickToCafe</h1>
        <p className="text-xl text-gray-600 mb-8">Find Restaurants Near You</p>

        <div className="flex justify-center items-center">
          <div className="flex items-center bg-orange-200 rounded-lg p-4 shadow-md">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search location here...."
                className="pl-4 pr-10 w-full bg-gray-800 text-white placeholder-gray-400 p-2 rounded-l-lg focus:outline-none"
              />
              <FontAwesomeIcon
                icon={faCompass}
                className="absolute right-3 text-orange-500 text-lg cursor-pointer"
              />
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600">
              Set Location
            </button>
            <span className="mx-2 text-gray-600">Or</span>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Pick From Map
            </button>
          </div>
        </div>
      </div>
    </section>


    
    <div className="flex justify-center items-center container mx-auto max-w-5xl ">
      <div className="flex items-center space-x-16 pt-5">
        <div className="text-center text-white">
          <img src={order} alt="Order Online" width={100} height={100} className="mx-auto" />
          <h2 className="text-xl font-bold mt-4">Order Online</h2>
          <p className="text-sm mt-2">Order in for yourself or for the group, with no restrictions on order value</p>
        </div>
        <div className="relative">
          <svg className="w-24 h-1" fill="none" stroke="white" viewBox="0 0 96 4">
            <path d="M 0 2 Q 24 0 48 2 T 96 2" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="text-center text-white">
          <img src={delivery} alt="Fast Delivery" width={100} height={100} className="mx-auto" />
          <h2 className="text-xl font-bold mt-4">Fast Delivery</h2>
          <p className="text-sm mt-2">Order in for yourself or for the group, with no restrictions on order value</p>
        </div>
        <div className="relative">
          <svg className="w-24 h-1" fill="none" stroke="white" viewBox="0 0 96 4">
            <path d="M 0 2 Q 24 4 48 2 T 96 2 " strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="text-center text-white">
          <img src={enjoy} alt="Enjoy Fresh Food" width={100} height={100} className="mx-auto"/>
          <h2 className="text-xl font-bold mt-4">Enjoy Fresh Food</h2>
          <p className="text-sm mt-2">Order in for yourself or for the group, with no restrictions on order value</p>
        </div>
      </div>
    </div>










    
</>
  );
};

export default HeroSection;