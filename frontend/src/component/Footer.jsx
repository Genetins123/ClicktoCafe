import React from 'react';
import playstore from '../assets/playstore.png';
import appstore from '../assets/appstore.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Icon imports

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      {/* Social Icons and Copyright */}
      <div className="container mx-auto max-w-6xl mt-6 flex flex-col md:flex-row justify-center items-center pt-4">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-2xl text-gray-400 hover:text-orange-400" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-2xl text-gray-400 hover:text-orange-400" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl text-gray-400 hover:text-orange-400" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-2xl text-gray-400 hover:text-orange-400" />
          </a>
        </div>
      </div>

      {/* Top Links */}
      <div className="container mx-auto max-w-6xl mt-4 text-sm sm:text-base text-gray-400 flex flex-wrap text-center md:text-left justify-center items-center border-b border-gray-700 pb-5 space-x-2 sm:space-x-4">
  <a href="#" className="hover:text-orange-400">Open Restaurant</a>
  <span className="hidden sm:inline">|</span>
  <a href="#" className="hover:text-orange-400">Become A Delivery Man</a>
  <span className="hidden sm:inline">|</span>
  <a href="#" className="hover:text-orange-400">Profile</a>
  <span className="hidden sm:inline">|</span>
  <a href="#" className="hover:text-orange-400">Help & Support</a>
</div>


      {/* Links Section */}
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-center mt-6 items-start">
        {/* Left Section */}
        <div className="mb-6 md:mb-0 w-full md:w-1/3 text-center md:text-left">
          <div className="text-orange-400 font-bold text-2xl mb-3">ClickToCafe</div>
          <p className="text-sm md:text-lg text-gray-400 mb-2">is Best Delivery Service Near You</p>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
            <span className="text-gray-400 text-sm md:text-lg">🏠 House: 00, Road: 00, City-0000, Country</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
            <span className="text-gray-400 text-sm md:text-lg">📧 admin@gmail.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
            <span className="text-gray-400 text-sm md:text-lg">📞 +88017-00000000</span>
          </div>
          <div className="flex justify-center md:justify-start space-x-3 mt-3">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <img src={playstore} alt="Google Play" className="w-28 h-auto" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="App Store" className="w-28 h-auto" />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex space-x-12 mb-6 md:mb-0 w-full md:w-1/3 justify-center">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Quick Links</h3>
            <ul className="text-md text-gray-400 space-y-2">
              <li><a href="https://example.com/about" className="hover:text-orange-400">About Us</a></li>
              <li><a href="https://example.com/wallet" className="hover:text-orange-400">My Wallet</a></li>
              <li><a href="https://example.com/loyalty" className="hover:text-orange-400">Loyalty Points</a></li>
              <li><a href="https://example.com/cuisines" className="hover:text-orange-400">Cuisines</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Quick Links</h3>
            <ul className="text-sm md:text-md text-gray-400 space-y-2">
              <li><a href="https://example.com/new-restaurants" className="hover:text-orange-400">New Restaurants</a></li>
              <li><a href="https://example.com/popular-restaurants" className="hover:text-orange-400">Popular Restaurants</a></li>
              <li><a href="https://example.com/best-foods" className="hover:text-orange-400">Best Reviewed Foods</a></li>
              <li><a href="https://example.com/track-order" className="hover:text-orange-400">Track Order</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h3 className="md:text-lg font-semibold text-gray-300 mb-2">Other</h3>
          <ul className="md:text-md text-sm text-gray-400 space-y-2">
            <li>Privacy Policy</li>
            <li>Term & Conditions</li>
            <li>Refund Policy</li>
            <li>Cancellation Policy</li>
          </ul>
        </div>
      </div>

      <div className="text-sm md:text-lg text-gray-400 text-center mt-6">
        Copyright © 2025 ClickToCafe. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;