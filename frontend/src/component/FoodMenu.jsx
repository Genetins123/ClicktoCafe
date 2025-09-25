import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Custom Arrows with hidden by default, shown on hover
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export default function FoodMenuSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="w-full relative group">
      <h2 className="text-lg font-semibold mb-4">What's on your mind?</h2>

      <Slider {...settings}>
        {foodItems.map((item, idx) => (
          <div key={idx} className="p-3 text-center">
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
            <p className="mt-2 text-base">{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
