import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, Clock, Heart, Share2, MapPin, Gift, Copy, X } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";
import FoodPopup from "../component/FoodPopup";



function RestaurantFoods() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedFood, setSelectedFood] = useState(null); // 🔹 modal food

  const { favorites, toggleFavorite } = useFavorites();


  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${id}/foods`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.foods || []);
        setRestaurant(data.restaurant || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ success message popup
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // cart utils
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCart = (food) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === food._id);

    if (existing) {
      existing.quantity += 1;
      showMessage(`${food.name} quantity increased ✅`);
    } else {
      cart.push({
        id: food._id,
        ...food,
        quantity: 1,
        name: food.name,
        price: food.price,
        image: food.image_url,
        description: food.description,
        restaurantName: restaurant?.name,
      });
      showMessage(`${food.name} added to cart ✅`);
    }
    saveCart(cart);
  };

  const decreaseQty = (food) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === food._id);
    if (existing) {
      if (existing.quantity > 1) {
        existing.quantity -= 1;
        showMessage(`${food.name} quantity decreased ✅`);
      } else {
        cart = cart.filter((item) => item._id !== food._id);
        showMessage(`${food.name} removed from cart ❌`);
      }
      saveCart(cart);
    }
  };

  const getQty = (id) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === id);
    return existing ? existing.quantity : 0;
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <>


      {message && (
        <div className="fixed top-5 right-5 bg-green-600 z-20 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {message}
        </div>
      )}

      {/* 🔹 Restaurant Header */}
      {restaurant && (
        <div className="relative w-full max-w-6xl mx-auto mb-8 rounded-lg overflow-hidden flex h-64 border-b-1 border-orange-500 shadow-[0_4px_20px_rgba(249,115,22,0.6)]">
          {/* LEFT SECTION */}
          <div className=" bg-black bg-opacity-80 flex flex-col justify-center px-6 w-1/2">
            {/* Logo + Name */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  restaurant.logo_url ||
                  "https://img.freepik.com/premium-vector/restaurant-logo-design_617585-671.jpg"
                }
                alt="logo"
                className="w-20 h-20 rounded-full border-2 border-white"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
                <p className="text-gray-300 text-sm">
                  {restaurant.cuisine || "Bengali, Indian, Pizza, Pasta"}
                </p>
              </div>
            </div>

            {/* Rating + Reviews */}
            <div className="flex items-center mt-3 space-x-3 text-gray-200">
              <span className="bg-green-600 text-white text-sm px-2 py-0.5 rounded flex items-center">
                <Star className="w-4 h-4 text-white mr-1" />
                {restaurant.rating?.toFixed(1) || "0.0"}
              </span>
              <a href="#" className="underline text-sm">
                3 Ratings
              </a>
              <span>|</span>
              <a href="#" className="underline text-sm">
                3 Reviews
              </a>
            </div>

            {/* Positive Review + Delivery Time */}
            <div className="flex items-center mt-4 space-x-12 text-white">
              <div>
                <p className="text-2xl font-bold">100 %</p>
                <p className="text-sm text-gray-300">Positive Review</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {restaurant.delivery_time || "30-40-min"}
                </p>
                <p className="text-sm text-gray-300">Delivery Time</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div
            className="w-2/3 bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${restaurant.image_url || "https://via.placeholder.com/800x300"
                })`,
            }}
          >
            {/* COUPON CARD */}
            <div className="bg-gray-900 bg-opacity-90 text-white p-6 rounded-lg shadow-lg w-80 relative">
              {/* Copy Icon (Top-Right) */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(restaurant.coupon || "free50");
                  toast.success("Coupon copied! 🎉", {
                    style: {
                      border: "1px solid #f97316", // orange border
                      padding: "10px",
                      color: "#fff",
                      background: "#1f2937", // gray-800
                    },
                    iconTheme: {
                      primary: "#f97316", // orange
                      secondary: "#fff",
                    },
                  });
                }}
                className="absolute top-3 right-3 text-gray-300 hover:text-white"
                title="Copy Coupon"
              >
                <Copy className="w-5 h-5" />
              </button>

              {/* Gift Icon + Offer */}
              <div className="flex items-center mb-4">
                <Gift className="w-8 h-8 text-yellow-400 mr-3" />
                <span className="text-2xl font-extrabold">
                  {restaurant.offer || "50 % OFF"}
                </span>
              </div>

              {/* Coupon Code Box */}
              <div className="flex flex-col items-center mb-4">
                <span className="bg-orange-500 text-xs px-3 py-1 rounded-t-md font-bold">
                  Coupon Code
                </span>
                <div className="border border-orange-500 rounded-b-md w-full text-center py-2">
                  <span className="text-orange-400 font-extrabold text-lg tracking-wide">
                    {restaurant.coupon || "free50"}
                  </span>
                </div>
              </div>

              {/* Validity */}
              <p className="text-sm text-gray-300 text-center">
                {restaurant.offer_validity || "Feb 7th ‘23 to Dec 1st ‘25"}
              </p>
            </div>

          </div>

        </div>



      )}

      {/* 🔹 Menu */}
      {/* 🔹 Food Cards */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            onClick={() => setSelectedFood(food)} // 🔹 open modal
            className="bg-[#282525] rounded-xl overflow-hidden shadow hover:scale-105 transition cursor-pointer relative"
          >
            {/* Image */}
            <img
              src={food.image_url || "https://via.placeholder.com/300"}
              alt={food.name}
              className="w-full p-2 h-40 object-cover"
            />

            {/* Offer Tag */}
            {food.offer > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                {food.offer}% OFF
              </span>
            )}

            {/* Fav btn */}
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

            {/* Details */}
            <div className="px-4 pb-4">
              <h3 className="text-white text-sm font-semibold">{food.name}</h3>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-orange-500 text-md">
                  ₹
                  {food.offer > 0
                    ? (food.price - (food.price * food.offer) / 100).toFixed(2) // discounted price
                    : food.price.toFixed(2)}  {/* no discount case */}
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

      {/* 🔹 Modal */}
      {selectedFood && (

        <FoodPopup
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          addToCart={(food, qty, size) => {
            console.log("Added to cart:", food, qty, size);
            setSelectedFood(null);
          }}
        />
      )}
    </>
  );
}

export default RestaurantFoods;
