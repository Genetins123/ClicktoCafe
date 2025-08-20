import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icon package

import p4 from "../assets/p4.png";
import p5 from "../assets/p5.png";
import p6 from "../assets/p6.png";
import p7 from "../assets/p7.png";
import p8 from "../assets/p8.png";
import p9 from "../assets/p9.png";
import p10 from "../assets/p10.png";
import p11 from "../assets/p11.png";
import p12 from "../assets/p12.png";
import p13 from "../assets/p13.png";
import p14 from "../assets/p14.png";
import p15 from "../assets/p15.png";

const foodItems = [
  { name: "Biryani", img: p4 },
  { name: "South Indian", img: p5 },
  { name: "North Indian", img: p6 },
  { name: "Cake", img: p7 },
  { name: "Shawarma", img: p8 },
  { name: "Parotta", img: p9 },
  { name: "Paratha", img: p10 },
  { name: "Pasta", img: p11 },
  { name: "Pizza", img: p12 },
  { name: "Juice", img: p13 },
  { name: "Ice Cream", img: p14 },
  { name: "Burger", img: p15 },
];

export default function FoodMenu() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative">
      <h2 className="text-lg text-center font-semibold mb-4">What's on your mind?</h2>

      {/* Mobile: 4x2 swipe grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:hidden">
        {Array.from({ length: Math.ceil(foodItems.length / 8) }).map(
          (_, pageIndex) => {
            const pageItems = foodItems.slice(pageIndex * 8, (pageIndex + 1) * 8);
            return (
              <div
                key={pageIndex}
                className="min-w-full grid grid-cols-4 gap-4 snap-center p-2"
              >
                {pageItems.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 mx-auto rounded-full object-cover"
                    />
                    <p className="mt-1 text-sm">{item.name}</p>
                  </div>
                ))}
              </div>
            );
          }
        )}
      </div>

      {/* Desktop: horizontal scroll with arrows */}
      <div className="hidden max-w-7xl md:block relative">
        {/* left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* scrollable items */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4  scrollbar-hide scroll-smooth"
        >
          {foodItems.map((item, idx) => (
            <div key={idx} className="flex-shrink-0  w-40 text-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 mx-auto rounded-full object-cover"
              />
              <p className="mt-2 text-base">{item.name}</p>
            </div>
          ))}
        </div>

        {/* right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
