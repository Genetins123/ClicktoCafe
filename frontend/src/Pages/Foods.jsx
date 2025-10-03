import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext"; // ✅ added
import toast from "react-hot-toast";

const FoodPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart(); // ✅ use global cart

  useEffect(() => {
    fetch(`http://localhost:5000/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch food:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!food) return <p className="text-center mt-10">Food not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#282525] rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row gap-6">
        <img
          src={food.image_url || "https://via.placeholder.com/400"}
          alt={food.name}
          className="w-full md:w-1/2 h-64 object-cover"
        />

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">{food.name}</h2>
              <button
                onClick={() => toggleFavorite(food)}
                className="p-1 rounded-full bg-white shadow hover:scale-110 transition"
              >
                <Heart
                  size={20}
                  className={
                    favorites.find((f) => f._id === food._id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                <Star className="w-3 h-3" />
                <span>{food.rating || 0}</span>
              </div>
              <span className="text-gray-400 text-sm">
                {food.reviews || 0} Reviews
              </span>
            </div>

            <p className="text-gray-300 mt-4">
              {food.description || "No description available."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-orange-500 font-bold text-xl">
              ₹
              {food.offer > 0
                ? (food.price - (food.price * food.offer) / 100).toFixed(2)
                : food.price.toFixed(2)}
            </span>
            {food.offer > 0 && (
              <span className="line-through text-gray-500">
                {food.price.toFixed(2)}
              </span>
            )}

            {/* ✅ Global Cart Logic */}
            <button
              onClick={() => {
                addToCart(
                  {
                    id: food._id,
                    name: food.name,
                    price:
                      food.offer > 0
                        ? food.price - (food.price * food.offer) / 100
                        : food.price,
                    image_url: food.image_url,
                  },
                  1
                );
                toast.success(`${food.name} added to cart!`);
              }}
              className="ml-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
