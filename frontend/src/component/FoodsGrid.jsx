import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import FoodPopup from "../component/FoodPopup";

// ================== FoodsGrid Component ==================
const FoodsGrid = ({ activeFilter }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  // cart utils
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCart = (food, qty = 1) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === food._id);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: food._id,
        ...food,
        quantity: qty,
        name: food.name,
        price: food.price,
        image: food.image_url,
      });
    }
    saveCart(cart);
  };

  // fetch foods
  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/foods");
      let data = res.data;

      if (activeFilter === "Veg") {
        data = data.filter((f) => f.foodType === "veg");
      } else if (activeFilter === "Non-Veg") {
        data = data.filter((f) => f.foodType === "non-veg");
      } else if (activeFilter === "Ratings 4 +") {
        data = data.filter((f) => f.rating >= 4);
      } else if (activeFilter === "Discounted") {
        data = data.filter((f) => f.offer > 0);
      } else if (activeFilter === "New Arrivals") {
        data = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (activeFilter === "Popular") {
        data = data.sort((a, b) => b.rating - a.rating);
      }

      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFilter) fetchFoods();
  }, [activeFilter]);

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-6">Showing {activeFilter} Foods</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-gray-400">No foods found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              onClick={() => setSelectedFood(food)}
              className="bg-[#282525] rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer relative"
            >
              {/* image */}
              <img
                src={food.image_url || "https://via.placeholder.com/300"}
                alt={food.name}
                className="w-full p-2 h-40 object-cover"
              />

              {/* offer tag */}
              {food.offer > 0 && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {food.offer}% OFF
                </span>
              )}

              {/* fav button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(food);
                }}
                className="absolute top-2 right-2 p-1 rounded-full bg-white shadow hover:scale-110 transition"
              >
                <Heart
                  size={16}
                  className={
                    favorites.find((item) => item._id === food._id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                  }
                />
              </button>

              {/* details */}
              <div className="px-4 pb-4">
                <h3 className="text-white text-sm font-semibold">
                  {food.name}
                </h3>
                <p className="flex items-center gap-2">
                  <span className="font-semibold text-orange-500 text-md">
                    ₹
                    {food.offer > 0
                      ? (food.price - (food.price * food.offer) / 100).toFixed(2)
                      : food.price.toFixed(2)}
                  </span>
                  {food.offer > 0 && (
                    <span className="line-through text-gray-500 text-sm">
                      ₹{food.price.toFixed(2)}
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    <Star className="w-3 h-3 " />
                    <span>{food.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* popup */}
      {selectedFood && (
        <FoodPopup
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          addToCart={(food, qty) => {
            addToCart(food, qty);
            setSelectedFood(null);
          }}
        />
      )}
    </div>
  );
};

export default FoodsGrid;
