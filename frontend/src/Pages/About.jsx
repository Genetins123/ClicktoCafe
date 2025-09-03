import React from "react";
import Header from '../component/Header'
import Footer from "../component/Footer";

export default function About() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-r from-grad1start to-grad1end flex flex-col items-center py-12 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h1>

      {/* Intro */}
      <p className="max-w-2xl text-center text-gray-600 mb-10">
        Welcome to <span className="font-semibold text-orange-600">ClickToCafe</span>, 
        your go-to destination for delicious meals delivered right to your doorstep. 
        We partner with top restaurants to bring you fresh, fast, and tasty food — anytime, anywhere.
      </p>

      {/* Cards Section */}
      <div className="grid gap-8 md:grid-cols-3 max-w-5xl w-full">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🍴 Fresh & Tasty</h2>
          <p className="text-gray-600">
            We ensure every meal is freshly prepared and delivered hot, just like you’d enjoy in the restaurant.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🚀 Fast Delivery</h2>
          <p className="text-gray-600">
            With our smart delivery system, you get your favorite meals at lightning-fast speed.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">💳 Easy Payments</h2>
          <p className="text-gray-600">
            Pay securely with multiple options — credit card, UPI, or cash on delivery.
          </p>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600">
          To make food ordering simple, fast, and delightful for everyone. 
          We believe good food brings people together, and we’re here to make that happen.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
