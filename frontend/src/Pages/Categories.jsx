import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Truck, Filter, ChevronDown, Heart, Plus } from 'lucide-react';
import Header from '../component/Header';
import { Link } from "react-router-dom";
import RestaurantFoods from './RestaurantFoods';



function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState(new Set());
  const [restaurants, setRestaurants] = useState([]); // API data

  // Fetch from API
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
      })
      .catch(err => console.error("Error fetching restaurants:", err));
  }, []);


  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      restaurant.cuisine?.toLowerCase() === categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen ">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">



        {/* Categories */}
        <section className="mb-8">
          <div className='flex flex-col items-center '>
            <h2 className="text-2xl font-bold text-white mb-6">
              Choose Food from your Favourite Restaurants

 
            </h2>

            <div className="flex items-center space-x-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for restaurants and food"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 text-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>


        </section>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className=" rounded-md  shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="relative ">

                <Link to={`/restaurant/${restaurant._id}`}>
                  <img
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    className="w-full h-[150px] bg-[#292525] p-3 object-cover  group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {restaurant.offer && (
                  <div className="absolute bottom-3 left-3 bg-white text-orange-600 text-sm px-3 py-1 rounded-full font-bold shadow-md">
                    {restaurant.offer}
                  </div>
                )}

              </div>

              <div className="p-4 bg-[#292525]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-orange-500 flex-1">
                    {restaurant.name}
                  </h3>
                </div>

                <p className="text-white text-sm mb-3">
                  {restaurant.cuisine}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="text-sm text-white  ">
                      {restaurant.delivery_time}
                    </div>
                  </div>

                  {/* <div className="text-sm">
                    <span className={`font-medium ${restaurant.delivery_type === 'Free Delivery' ? 'text-green-600' : 'text-gray-600'}`}>
                      {restaurant.delivery_type}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search or browse our categories</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Categories;
