import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Header from "../component/Header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (Array.isArray(savedCart)) {
      setCartItems(savedCart);
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
      )
    : 0;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {/* Restaurant Name */}
            <h3 className="text-xl font-semibold mb-4">
              🍴 {cartItems[0]?.restaurantName || "Restaurant"}
            </h3>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
              >
                {/* Left: image + details */}
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  {/* Details */}
                  <div>
                    <h3 className="font-semibold pb-2 text-lg">{item.name}</h3>
                    <p className="text-sm max-w-3xl text-gray-500">
                      {item.description || "Delicious food"}
                    </p>
                    <p className="text-gray-700 font-medium">₹{item.price}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity || 1}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-4">
              <h3 className="text-lg font-semibold">Total:</h3>
              <p className="text-xl font-bold">₹{totalPrice}</p>
            </div>

            {/* Checkout button */}
            <button className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
