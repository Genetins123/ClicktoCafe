import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function RestaurantFoods() {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // ✅ success message

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetch(`http://localhost:5000/api/restaurants/${id}/foods`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.foods || []);
        setRestaurant(data.restaurant || "Restaurant");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔹 Show message for 2s
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // 🔹 Get cart
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

  // 🔹 Save cart
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  // 🔹 Add item
  const addToCart = (food) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === food._id);

    if (existing) {
      existing.quantity += 1;
      showMessage(`${food.name} quantity increased ✅`);
    } else {
      cart.push({
        id: food._id,              // 👈 add this line
        ...food,
        quantity: 1,
        name: food.name,
        price: food.price,
        image: food.image_url,
        description: food.description,
        restaurantName: food.restaurant.name,
      });

      showMessage(`${food.name} added to cart ✅`);
    }

    saveCart(cart);
  };

  // 🔹 Decrease item
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

  // 🔹 Get item qty
  const getQty = (id) => {
    let cart = getCart();
    const existing = cart.find((item) => item._id === id);
    return existing ? existing.quantity : 0;
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading foods...</p>;

  return (
    <>
      <Header />

      {/* ✅ Success message */}
      {message && (
        <div className="fixed top-5 right-5 bg-green-600 z-20 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {message}
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {restaurant} Menu
        </h2>

        <div className="space-y-6">
          {foods.map((food) => {
            const qty = getQty(food._id);

            return (
              <div
                key={food._id}
                className="flex justify-between items-start border-b pb-4"
              >
                {/* LEFT */}
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">₹{food.price}</p>
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    <Star size={14} className="mr-1" />
                    {food.rating?.toFixed(1) || "0.0"}
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {food.description || "No description available."}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="w-28 flex flex-col items-center relative">
                  <img
                    src={food.image_url || "https://via.placeholder.com/150"}
                    alt={food.name}
                    className="w-full h-24 object-cover rounded-lg border"
                  />

                  {food.offer > 0 && (
                    <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      {food.offer}% OFF
                    </span>
                  )}

                  {/* Heart button */}
                  <button
                    onClick={() => toggleFavorite(food)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-white shadow hover:scale-110 transition"
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

                  {/* Qty buttons */}
                  {qty > 0 ? (
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => decreaseQty(food)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="font-medium">{qty}</span>
                      <button
                        onClick={() => addToCart(food)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(food)}
                      className="mt-2 bg-green-500 text-white text-sm py-1 px-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      ADD
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RestaurantFoods;
