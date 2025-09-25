import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FoodMenu from './FoodMenu';

const HomeSlide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    autoplay: true, // Enable auto slide
    autoplaySpeed: 2000, // Slide every 3 seconds (adjust as needed)
    centerPadding: '0',
    variableWidth: false,
    arrows: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-22-6767f2f78747b.png&w=750&q=75',
      title: '',
      subtitle: '',
    },
    {
      id: 2,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-22-6767f29c37d59.png&w=750&q=75',
      title: 'BEST TACOS AROUND',
      subtitle: 'Fast Home Delivery',
    },
    {
      id: 3,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-22-6767f28db0ac1.png&w=750&q=75',
      title: '',
      subtitle: '',
    },
    {
      id: 1,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-08-675672605c3cf.png&w=750&q=75',
      title: '',
      subtitle: '',
    },
    {
      id: 2,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-22-6767f307e27a2.png&w=750&q=75',
      title: 'BEST TACOS AROUND',
      subtitle: 'Fast Home Delivery',
    },
    {
      id: 3,
      image: 'https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fbanner%2F2024-12-08-675677579b964.png&w=750&q=75',
      title: '',
      subtitle: '',
    },
  ];

  return (
    <div className="flex justify-center items-center m-5">
      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="px-2">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-96 h-42 object-cover rounded-lg"
              />


            </div>
          ))}
        </Slider>
       
      </div>
    </div>
  );
};

export default HomeSlide;