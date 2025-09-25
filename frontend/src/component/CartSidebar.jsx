// src/component/CartSidebar.js
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/checkout", { state: { cartItems, totalPrice } });
    onClose(); // close sidebar after navigating
  };

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-[#1e1e1e] text-white shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          cartItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#2a2a2a] p-3 rounded"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">Qty: {item.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400">
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <p className="flex justify-between text-lg font-bold">
          <span>Total:</span> <span>₹{totalPrice.toFixed(2)}</span>
        </p>
        <button
          onClick={handleCheckout}
          className="bg-orange-500 w-full mt-4 py-2 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
