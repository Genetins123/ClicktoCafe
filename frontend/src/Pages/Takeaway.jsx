import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Clock, Truck, Filter, ChevronDown, Heart, Plus } from 'lucide-react';
import Header from '../component/Header';
import { Link } from "react-router-dom";

// Categories (pure JS objects)
const categories = [
  { id: 1, name: 'Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 2, name: 'Burgers', image: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 3, name: 'Chinese', image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 4, name: 'Desserts', image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 5, name: 'North Indian', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 6, name: 'South Indian', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 7, name: 'Biryani', image: 'https://images.pexels.com/photos/11786132/pexels-photo-11786132.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' },
  { id: 8, name: 'Healthy', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }
];

function Takeaway() {
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white p-8 mb-8 relative overflow-hidden">
          <div className="relative ">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Craving something delicious?</h1>
            <p className="text-lg opacity-90 mb-4">Get your favorite food delivered in minutes</p>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>Delivery in 30-45 mins</span>
              <span className="mx-2">•</span>
              <Truck className="w-4 h-4" />
              <span>Free delivery on orders above ₹199</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 right-8 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>


        {/* Categories */}
        <section className="mb-8">
          <div className='flex flex-row items-center justify-between'>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Restaurants near you
            </h2>

            <div className="flex items-center space-x-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for restaurants and food"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          
        </section>
        
        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
              <div className="relative">
                
                <Link to={`/restaurant/${restaurant._id}`}>
  <img
    src={restaurant.image_url}
    alt={restaurant.name}
    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
  />
</Link>

                {restaurant.offer && (
                  <div className="absolute bottom-3 left-3 bg-white text-orange-600 text-sm px-3 py-1 rounded-full font-bold shadow-md">
                    {restaurant.offer}
                  </div>
                )}
                
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {restaurant.name}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-3">
                  {restaurant.cuisine}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {restaurant.delivery_time}
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className={`font-medium ${restaurant.delivery_type === 'Free Delivery' ? 'text-green-600' : 'text-gray-600'}`}>
                      {restaurant.delivery_type}
                    </span>
                  </div>
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

export default Takeaway;
