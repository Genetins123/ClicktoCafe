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
import Header1 from "../component/Header1";
import Letsconnet from "../component/Letsconnect";


function Homepage() {
  return (
    <>

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

      <section className="text-white mb-20 mt-10 px-4">
        <div className="max-w-7xl container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src={sec1}
              alt="Delivery"
              className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] object-contain"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Available delivery areas / Zone
            </h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              We offer delivery services across a wide range of regions...
            </p>
            <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold border border-gray-600 hover:bg-gray-800 transition">
              All Over The World
            </button>
          </div>
        </div>
      </section>

      
<Letsconnet />
    </>
  )
}

export default Homepage






