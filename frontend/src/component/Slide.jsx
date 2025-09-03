import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = () => {
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
    // nextArrow: <button className="slick-arrow slick-next">Next</button>,
    // prevArrow: <button className="slick-arrow slick-prev">Previous</button>,
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
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-649272340211f.png',
      title: '',
      subtitle: '',
    },
    {
      id: 2,
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-64927258759e3.png',
      title: 'BEST TACOS AROUND',
      subtitle: 'Fast Home Delivery',
    },
    {
      id: 3,
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-6492726d4d0f2.png',
      title: '',
      subtitle: '',
    },
    {
      id: 1,
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-649272340211f.png',
      title: '',
      subtitle: '',
    },
    {
      id: 2,
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-64927258759e3.png',
      title: 'BEST TACOS AROUND',
      subtitle: 'Fast Home Delivery',
    },
    {
      id: 3,
      image: 'https://stackfood-admin.6amtech.com/storage/app/public/react_promotional_banner/2023-06-21-6492726d4d0f2.png',
      title: '',
      subtitle: '',
    },
  ];

  return (
    <div className="flex justify-center items-center p-20">
      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="px-2">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="w-96 h-42 object-cover rounded-t-lg"
                />
                
              
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;