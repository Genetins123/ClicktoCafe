import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import p4 from '../assets/p4.png';
import p5 from '../assets/p5.png';
import p6 from '../assets/p6.png';
import p7 from '../assets/p7.png';
import p8 from '../assets/p8.png';
import p9 from '../assets/p9.png';
import p10 from '../assets/p10.png';
import p11 from '../assets/p11.png';
import p12 from '../assets/p12.png';
import p13 from '../assets/p13.png';
import p14 from '../assets/p14.png';
import p15 from '../assets/p15.png';

const foodItems = [
  { name: "Food", img: p4 },
  { name: "Food", img: p5 },
  { name: "Food", img: p6 },
  { name: "Food", img: p7 },
  { name: "Food", img: p8 },
  { name: "Food", img: p9 },
  { name: "Food", img: p10 },
  { name: "Food", img: p11 },
  { name: "Food", img: p12 },
  { name: "Food", img: p13 },
  { name: "Food", img: p14 },
  { name: "Food", img: p15 },
];
export default function FoodMenu() {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full food">
      <h2 className="text-xl font-semibold p-4 mb-4">What's on your mind?</h2>
      <div className="flex items-center">
        <button 
          onClick={() => scroll(-500)}
          className="p-2 rounded-full shadow bg-gray-100 hover:bg-gray-200 mr-2"
        >
           <FaArrowLeft />
        </button>
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
        >
          {foodItems.map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-40 text-center">
              <img src={item.img} alt={item.name} className="w-30 h-30 p-3 mx-auto rounded-full object-cover" />
              <p className="mt-2 text-gray-700 text-base">{item.name}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => scroll(500)}
          className="p-2 rounded-full shadow bg-gray-100 hover:bg-gray-200 ml-2"
        >
           <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
