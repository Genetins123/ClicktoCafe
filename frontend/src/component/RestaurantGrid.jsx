import React, { useState } from "react";

const restaurants = [
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767deb84fbad.png&w=640&q=75", title: "Café Monarch", time: "30-40-min", reviews: 1, rating: 5.0, status: null, category: "All" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767e83ef128d.png&w=640&q=75", title: "Mini Kebab", time: "30-40-min", reviews: 0, rating: null, status: null, category: "Newly Joined" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767e8c567244.png&w=640&q=75", title: "Redcliff Cafe", time: "30-40-min", reviews: 2, rating: 4.5, status: null, category: "Delivery" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767e9601d2b7.png&w=640&q=75", title: "Tasty Takeaways", time: "30-40-min", reviews: 0, rating: null, status: null, category: "Take Away" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767ebbcf4188.png&w=640&q=75", title: "Steak House", time: "30-40-min", reviews: 3, rating: 4.8, status: null, category: "Dine In" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767ea3259743.png&w=640&q=75", title: "Pasta Palace", time: "30-40-min", reviews: 0, rating: null, status: null, category: "Popular" },
  { img: "https://stackfood-react.6amtech.com/_next/image?url=https%3A%2F%2Fstackfood-admin.6amtech.com%2Fstorage%2Fapp%2Fpublic%2Frestaurant%2Fcover%2F2024-12-22-6767eb083754c.png&w=640&q=75", title: "Burger Corner", time: "30-40-min", reviews: 0, rating: null, status: "OPEN AT 09:00 AM", category: "Popular" },
  { img: "https://stackfood-admin.6amtech.com/storage/app/public/restaurant/cover/2024-12-22-6767e774dc934.png", title: "Grill House", time: "30-40-min", reviews: 1, rating: 4.2, status: null, category: "All" },
];

const filterOptions = ["All", "Newly Joined", "Delivery", "Take Away", "Dine In", "Popular"];

const RestaurantCard = ({ restaurant }) => (
  <div className="bg-[#1a1a1a] rounded-lg p-4 shadow-md relative">
    <img
      src={restaurant.img}
      alt={restaurant.title}
      className="w-full h-40 object-cover rounded-md"
    />
    {restaurant.status && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
        {restaurant.status}
      </div>
    )}
    <h3 className="text-white font-semibold mt-2">{restaurant.title}</h3>
    <p className="text-gray-400 text-xs">{restaurant.time}</p>
    {restaurant.reviews > 0 && (
      <div className="flex items-center gap-1 mt-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded w-max">
        ({restaurant.reviews}) {restaurant.rating} ★
      </div>
    )}
  </div>
);

const RestaurantGrid = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredRestaurants = restaurants.filter(
    (res) => selectedFilter === "All" || res.category === selectedFilter
  );

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">13 Restaurants</h2>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded ${
              selectedFilter === filter
                ? "bg-orange-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of Restaurants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants.map((res, idx) => (
          <RestaurantCard key={idx} restaurant={res} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantGrid;
