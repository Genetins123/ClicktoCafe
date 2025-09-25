  import React, { useEffect, useState } from "react";
  import { Heart, ShoppingCart, Star, X } from "lucide-react";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";


  const DescriptionToggle = ({ description }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleDescription = () => setShowMore(!showMore);

    return (
      <p className="text-gray-400 mt-1 text-sm">
        {showMore ? description : description.slice(0, 100) + "... "}
        <span
          className="text-orange-500 ml-1 cursor-pointer"
          onClick={toggleDescription}
        >
          {showMore ? "See less" : "Read more"}
        </span>
      </p>
    );
  };

  const FoodSection = () => {
      const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("trends");
    const [selectedFood, setSelectedFood] = useState(null);

    const sections = [
      { id: "trends", title: "Todays Trends" },
      { id: "popular", title: "Popular Foods" },
      { id: "reviewed", title: "Best Reviewed" },
    ];

    const handleScroll = (id) => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -150;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, []);

    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
    };

    const FoodCard = ({ food }) => (
      <div
        className="relative bg-[#1a1a1a] rounded-lg p-4 shadow-md hover:shadow-xl transition cursor-pointer"
        onClick={() => setSelectedFood(food)}
      >
        {food.offer && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {food.offer}
          </span>
        )}
        {!food.available && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white font-semibold text-sm">
            Not Available Now
          </div>
        )}
        <img
          src={food.img}
          alt={food.title}
          className="w-full h-32 object-cover rounded-md"
        />
        <h3 className="text-white font-semibold mt-2 truncate">{food.title}</h3>
        <p className="text-gray-400 text-xs">{food.restaurant}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-gray-300">( {food.reviewCount} )</span>
          <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
            <Star size={12} fill="white" /> {food.rating}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-orange-500 font-bold">${food.price}</span>
            {food.oldPrice && (
              <span className="text-gray-400 line-through text-sm ml-2">
                ${food.oldPrice}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Heart className="text-orange-500 cursor-pointer" size={18} />
            <ShoppingCart className="text-orange-500 cursor-pointer" size={18} />
          </div>
        </div>
      </div>
    );

    const foodsData = {
      trends: [
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770d0fc37fe1.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",


          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770cdab02283.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770cf8f7b6e6.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770cd4e8a38a.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          available: true,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770cf1c3af67.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fcampaign%2F2024-12-28-6770ce4708de5.png&w=1080&q=75",
          title: "Pizza Carnival",
          restaurant: "Hungry Puppets",
          price: 540,
          oldPrice: 600,
          offer: "10% OFF",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },

        // Add other items similarly...
      ],
      popular: [
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2024-12-22-6767fd551e8fc.png&w=256&q=75",
          title: "Meat Pizza",
          restaurant: "Hungry Puppets",
          price: 370,
          oldPrice: 400,
          offer: "$30.00",
          rating: 4.7,
          reviewCount: 3,
          available: true,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2021-08-21-611ff39525320.png&w=256&q=75",
          title: "Meat Pizza",
          restaurant: "Hungry Puppets",
          price: 370,
          oldPrice: 400,
          offer: "$30.00",
          rating: 4.7,
          reviewCount: 3,
          available: true,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2021-08-21-6120ee939f91d.png&w=256&q=75",
          title: "Meat Pizza",
          restaurant: "Hungry Puppets",
          price: 370,
          oldPrice: 400,
          offer: "$30.00",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2021-08-21-6120ee939f91d.png&w=256&q=75",
          title: "Meat Pizza",
          restaurant: "Hungry Puppets",
          price: 370,
          oldPrice: 400,
          offer: "$30.00",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2021-08-21-61210171ac92a.png&w=256&q=75",
          title: "Meat Pizza",
          restaurant: "Hungry Puppets",
          price: 370,
          oldPrice: 400,
          offer: "$30.00",
          rating: 4.7,
          reviewCount: 3,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        // Add other items similarly...
      ],
      reviewed: [
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2024-12-22-6767fc4a6a33c.png&w=1080&q=75",
          title: "Burger Combo",
          restaurant: "Cheese Burger",
          price: 80,
          oldPrice: null,
          offer: null,
          rating: 5.0,
          reviewCount: 1,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2024-12-22-6767fd551e8fc.png&w=1080&q=75",
          title: "Burger Combo",
          restaurant: "Cheese Burger",
          price: 80,
          oldPrice: null,
          offer: null,
          rating: 5.0,
          reviewCount: 1,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2024-12-22-6767fcec521d1.png&w=1080&q=75",
          title: "Burger Combo",
          restaurant: "Cheese Burger",
          price: 80,
          oldPrice: null,
          offer: null,
          rating: 5.0,
          reviewCount: 1,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2021-08-21-6121056f7c691.png&w=1080&q=75",
          title: "Burger Combo",
          restaurant: "Cheese Burger",
          price: 80,
          oldPrice: null,
          offer: null,
          rating: 5.0,
          reviewCount: 1,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },
        {
          img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Fproduct%2F2024-12-22-6767fc4a6a33c.png&w=1080&q=75",
          title: "Burger Combo",
          restaurant: "Cheese Burger",
          price: 80,
          oldPrice: null,
          offer: null,
          rating: 5.0,
          reviewCount: 1,
          description: "Neapolitan pizza (Italian: pizza napoletana) also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",

          available: true,
        },

        // Add other items similarly...
      ],
    };
    return (
      <div className="text-white min-h-screen">
        <div className="sticky top-[108px] bg-[#1c1919] z-30 border-b border-gray-700">
          <div className="flex space-x-6 px-6 py-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`relative pb-2 font-semibold transition ${activeSection === section.id
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-400"
                  }`}
              >
                {section.title}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[2px] rounded ${activeSection === section.id
                    ? "bg-orange-500"
                    : "bg-transparent"
                    }`}
                ></span>
              </button>
            ))}
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.id} id={section.id} className="p-6">
            <h2 className="text-lg font-bold text-orange-500 mb-4">
              {section.title}
            </h2>

            <div className="px-4">
              <Slider {...sliderSettings}>
                {foodsData[section.id].map((food, idx) => (
                  <div key={idx}>
                    <FoodCard food={food} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}

        {/* Popup Modal */}
        {selectedFood && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#272424] rounded-lg max-w-lg w-full  relative">

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 z-50  rounded-full px-3 py-1 text-white text-xl font-bold"
                onClick={() => setSelectedFood(null)}
              >
                ✕
              </button>

              {/* Food Image with Discount */}
              <div className="relative">
                <img
                  src={selectedFood.img}
                  alt={selectedFood.title}
                  className="w-full h-48 object-cover rounded"
                />


                {selectedFood.offer && (
                  <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {selectedFood.offer}
                  </span>
                )}
                {selectedFood.restaurant && (
                  <span className="absolute bottom-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {selectedFood.restaurant}
                  </span>
                )}
              </div>
  <div className="p-4">

              {/* Food Info */}
              <h2 className="text-white text-lg font-semibold ">
                {selectedFood.title} <span className="text-green-500 text-lg">●</span>
              </h2>

              {/* Description with Read More / See Less */}
              <DescriptionToggle description={selectedFood.description} />

              {/* Price Section */}
              {/* Price Section */}
              <div className="flex items-center justify-between mt-2">

                {/* Price Info */}
                <div className="flex items-center gap-2">
                  <span className="text-white">Starts From:</span>
                  <span className="text-orange-500 text-lg font-bold">
                    ${selectedFood.price}
                  </span>
                  {selectedFood.oldPrice && (
                    <span className="text-gray-400 text-md line-through">
                      ${selectedFood.oldPrice}
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <button
                    className="bg-[#413f3f] text-white px-3 py-1 rounded-full"
                    onClick={() =>
                      setSelectedFood({
                        ...selectedFood,
                        quantity: Math.max((selectedFood.quantity || 1) - 1, 1),
                      })
                    }
                  > 
                    −
                  </button>
                  <span className="text-white text-lg">
                    {selectedFood.quantity || 1}
                  </span>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded-full"
                    onClick={() =>
                      setSelectedFood({
                        ...selectedFood,
                        quantity: (selectedFood.quantity || 1) + 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>

              </div>




              {/* Add Ons */}
              <div className="mt-3">
                <h3 className="text-white font-semibold">Add Ons</h3>
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFood.addOns?.includes("Tomato Sauce") || false}
                      onChange={(e) => {
                        const addOns = selectedFood.addOns || [];
                        const updatedAddOns = e.target.checked
                          ? [...addOns, "Tomato Sauce"]
                          : addOns.filter((a) => a !== "Tomato Sauce");
                        setSelectedFood({ ...selectedFood, addOns: updatedAddOns });
                      }}
                      className="form-checkbox text-orange-500"
                    />
                    Tomato Sauce
                  </label>
                  <span className="text-gray-300">$10.00</span>
                </div>
              </div>

              {/* Total and Order Button */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-white font-semibold text-lg">
                  Total :{" "}
                  <span className="text-orange-500">
                    ${(
                      (selectedFood.price + (selectedFood.addOns?.length || 0) * 10) *
                      (selectedFood.quantity || 1)
                    ).toFixed(2)}
                  </span>
                  {selectedFood.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      (${selectedFood.oldPrice})
                    </span>
                  )}
                </span>
                <button
      className="bg-orange-500 text-white px-6 py-2 rounded"
      onClick={() =>
        navigate("/checkout", { state: { selectedFood } })
      }
    >
      Order Now
    </button>
              </div>
              
  </div>
            </div>
          </div>
        )}


      </div>
    );
  };

  export default FoodSection;
