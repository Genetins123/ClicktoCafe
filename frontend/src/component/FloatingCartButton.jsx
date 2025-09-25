// src/component/FloatingCartButton.js
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton({ onOpen }) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 font-semibold hover:bg-orange-600 z-50"
    >
      <ShoppingBag size={22} />
      <span>{totalItems} Items</span>
      <span>₹{totalPrice.toFixed(2)}</span>
    </button>
  );
}
