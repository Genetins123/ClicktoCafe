import { Link } from "react-router-dom";

export default function CartDropdown({ cartItems }) {
  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      {/* Cart Items */}
      <div className="space-y-2">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center text-sm"
          >
            <p className="text-gray-700">
              {item.name} × {item.quantity}
            </p>
            <span className="font-medium">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <Link
        to="/cart"
        className="block text-center bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600"
      >
        CHECKOUT
      </Link>
    </div>
  );
}
