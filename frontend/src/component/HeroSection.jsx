// src/components/HeroSection.jsx

import BgImage from "../assets/h-bg.png";


export default function HeroSection() {
  return (


    <section
  className="w-full min-h-[68vh] md:min-h-screen bg-cover bg-center" 
  style={{ 
    backgroundImage: `url(${BgImage})`,
    backgroundPosition:`right`,
    // backgroundPositionY:`-85px`
  
  }}
>
  
  <div className="block md:flex items-center justify-between">
    {/* Text Section */}
    <div className="max-w-2xl px-6 py-16 md:px-10 text-center md:text-left">
      <h1 className="text-2xl md:text-4xl font-bold">
        Multi Restaurant{" "}
        <span className="md:text-orange-500 text-white">Food Ordering & Delivery</span>{" "}
        Solution with Source Code
      </h1>
      <p className="md:text-gray-600  text-[#fcf1f1] font-bold mt-5">
        Build your very own multi restaurant online food ordering & delivery
        business with Stackfood’s complete source code & post-purchase
        services.
      </p>
      <div className="mt-6 flex  sm:flex-row justify-center md:justify-start gap-4">
       <button
  className="px-6 py-3 sm:px-8 sm:py-3 rounded-full md:text-white text-orange-500 font-semibold shadow-xl md:shadow-lg 
  md:bg-gradient-to-r from-orange-500 to-red-500 hover:bg-orange-100 active:bg-orange-200 transition text-sm sm:text-base
  bg-[#fcf1f1]"
>
  Buy Now →
</button>

<button
  className="px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold md:text-orange-500 text-[#fcf1f1]
  md:border border-orange-400 shadow-xl md:shadow-md md:hover:bg-[#ffecec] active:bg-[#ffdada] transition text-sm sm:text-base border border-[#fcf1f1] "
>
  View Demo →
</button>

      </div>
    </div>

    {/* Image Section */}
    <div className="relative right-5 hidden md:block">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
        alt="Food"
        className="w-[260px]"
      />
    </div> 
  </div>
</section>

  );
}
