import FoodMenu from "../component/FoodMenu";
import HeroSection from "../component/HeroSection";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { FaAward, FaChartPie, FaUsers, FaSyncAlt } from "react-icons/fa";
import Slide from "../component/Slide";
import banner2 from '../assets/banner2.jpg'
import sec1 from '../assets/sec1.webp'
import { ArrowRight } from "lucide-react";
import { Search, MapPin, Star, Clock, Truck, Filter, ChevronDown, Heart, Plus } from 'lucide-react';


function Homepage() {
  return (
    <>
      <Header />
      <HeroSection />

      <Slide />
      {/* Hero Banner */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="container max-w-7xl mx-auto text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-8 w-24 h-24 bg-white/5 rounded-full"></div>
         
          <div className="relative ">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Craving something delicious?</h1>
            <p className="text-lg opacity-90 mb-4">Get your favorite food delivered in minutes</p>

          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 right-8 w-24 h-24 bg-white/5 rounded-full"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 right-8 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>
      </main>

      <section className=" text-white mb-20 mt-10 px-8">
        <div className="max-w-7xl container mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Left Side - Image */}
          <div className="flex justify-center">
            <img
              src={sec1} // 🔹 replace with your delivery image
              alt="Delivery"
              className="w-[300px] md:w-[400px] object-contain"
            />
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available delivery areas / Zone
            </h2>
            <p className="text-gray-400 mb-6">
              We offer delivery services across a wide range of regions. To see if we deliver
              to your area, check our list of available delivery zones or use our delivery.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold border border-gray-600 hover:bg-gray-800 transition">
              All Over The World
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-brown-600 to-brown-800 py-10 px-4 text-white relative ">
        {/* Background Image - Replace with your image path */}
        <div
          className="absolute inset-0 bg-cover bg-center  opacity-40 "
          style={{ backgroundImage: `url(${banner2})` }}
        ></div>
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center relative z-10">
          {/* Left Text */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Lets Connect !</h2>
            <p className="text-md">Stay up to date with restaurants around you.</p>
            <p className="text-sm text-gray-300">Subscribe with email.</p>
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-[#1e1e1e] rounded-xl p-1 w-[400px]">
            {/* Input */}
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none px-3 py-2"
            />

            {/* Button */}
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-3 flex items-center justify-center shadow-md hover:opacity-90 transition">
              <ArrowRight className="text-black w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Homepage






