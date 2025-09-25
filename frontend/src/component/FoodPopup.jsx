import { useState } from "react";
import { Star, X } from "lucide-react";
import { useCart } from "../context/CartContext"; // 👈 Import useCart

export default function FoodPopup({ food, onClose }) {
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const { addToCart } = useCart(); // 👈 use global addToCart

  // base discounted price
  const basePrice = food.offer
    ? food.price - (food.price * food.offer) / 100
    : food.price;

  const extraPrice = selectedSize ? selectedSize.price : 0;
  const total = (basePrice + extraPrice) * qty;

  const handleAddToCart = () => {
    addToCart(
      {
        id: food.id,
        name: food.name,
        price: basePrice + extraPrice,
        image_url: food.image_url,
        size: selectedSize?.name || null,
      },
      qty
    );
    onClose(); // 👈 close popup after adding
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div className="bg-[#1e1e1e] text-white rounded-xl w-full max-w-lg overflow-hidden relative">
        {/* Close Btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 bg-black/50 p-1 rounded-full text-white hover:bg-black"
        >
          <X size={22} />
        </button>

        {/* Food Image */}
        <div className="relative">
          <img
            src={food.image_url || "https://via.placeholder.com/400"}
            alt={food.name}
            className="w-full h-56 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent rounded-lg"></div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-1 bg-green-500 px-2 py-1 rounded text-xs font-bold">
                <Star className="w-3 h-3 " />
                <span>{food.rating}</span>
              </div>
              <span className="text-sm font-medium">{food.restaurant.name}</span>
              {food.offer > 0 && (
                <span className="bg-blue-600 text-xs px-2 py-0.5 rounded">
                  {food.offer}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Food Info */}
        <div className="p-5">
          <h2 className="text-lg font-bold">{food.name}</h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mt-1">
            {showFullDesc
              ? food.description || "No description available."
              : (food.description || "No description available.").slice(0, 80) +
                "..."}
            {food.description && food.description.length > 80 && (
              <span
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-orange-400 cursor-pointer ml-1"
              >
                {showFullDesc ? "See less" : "Read more"}
              </span>
            )}
          </p>

          {/* Price & Quantity Single Line */}
          <div className="flex items-center justify-between mt-4">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-orange-400 text-lg">
                ₹{basePrice.toFixed(2)}
              </span>
              {food.offer > 0 && (
                <span className="line-through text-gray-500 text-sm">
                  ₹{food.price.toFixed(2)}
                </span>
              )}
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Qty:</span>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                -
              </button>
              <span className="px-2">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="bg-orange-500 px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Total & Add to Cart */}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">
              Total:{" "}
              <span className="text-orange-400">₹{total.toFixed(2)}</span>
              {food.offer > 0 && (
                <span className="ml-2 line-through text-gray-500 text-sm">
                  ₹{(food.price * qty).toFixed(2)}
                </span>
              )}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
