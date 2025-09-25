import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSlide from "../component/HomeSlide";
import FoodMenu from "../component/FoodMenu";
import Letsconnet from "../component/Letsconnect";
import FoodSection from "../component/FoodCarouselSection";
import RestaurantGrid from "../component/RestaurantGrid";
import Takeaway from "./Takeaway";
import SearchComponent from "../component/SearchComponent";

const BestRestaurantsSection = () => {
    const filterButtons = [
        "Sort By", "Veg", "Non-Veg", "Ratings 4 +", "New Arrivals", "Discounted", "Popular", "Halal"
    ];

    const restaurantItems = [
        { name: "Restaurant 1", img: "https://via.placeholder.com/300x200" },
        { name: "Restaurant 2", img: "https://via.placeholder.com/300x200" },
        { name: "Restaurant 3", img: "https://via.placeholder.com/300x200" },
        { name: "Restaurant 4", img: "https://via.placeholder.com/300x200" },
        { name: "Restaurant 5", img: "https://via.placeholder.com/300x200" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <ChevronRight className="text-white cursor-pointer" />,
        prevArrow: <ChevronLeft className="text-white cursor-pointer" />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="">


            <section className="  text-white container mx-auto max-w-6xl pt-4 relative">
                <h2 className="text-xl font-bold mb-6">Find Best Restaurants and Foods</h2>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {filterButtons.map((btn, idx) => (
                        <button
                            key={idx}
                            className="px-4 py-2 text-white text-opacity-50 border border-opacity-50  border-gray-600 rounded-2xl hover:bg-orange-500 hover:text-white transition"
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Carousel */}
                <HomeSlide />
                <FoodMenu />
        
                <FoodSection />
                {/* <RestaurantGrid /> */}
                <Takeaway />
               

            </section>


            <Letsconnet />
        </div>
    );
};

export default BestRestaurantsSection;
