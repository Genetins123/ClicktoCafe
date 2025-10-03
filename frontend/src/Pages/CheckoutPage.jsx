// src/pages/CheckoutPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};
  const { clearCart } = useCart();

  const [deliveryOption, setDeliveryOption] = useState("home");
  const [deliveryTip, setDeliveryTip] = useState(0);
  const [address, setAddress] = useState("Q972+VPF, Dhaka, Bangladesh");
  const [editingAddress, setEditingAddress] = useState(false);
  const [agree, setAgree] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="text-white p-8">
        <p>No items in cart. Please go back and add food.</p>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const discount = 0;
  const tax = totalPrice * 0.09;
  const serviceCharge = 10;
  const deliveryFee = deliveryOption === "home" ? 0 : 0;
  const grandTotal =
    totalPrice - discount + tax + serviceCharge + deliveryFee + deliveryTip;

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to place order!");
      navigate("/login");
      return;
    }

    if (!agree) {
      alert("⚠️ Please agree to Terms and Conditions before placing order.");
      return;
    }

    const orderDetails = {
      id: Date.now(),
      cartItems,
      subtotal: totalPrice,
      discount,
      tax,
      serviceCharge,
      deliveryFee,
      deliveryTip,
      total: grandTotal,
      deliveryOption,
      address,
      payment: "Cash On Delivery",
      date: new Date().toLocaleString(),
    };

    const allOrders = JSON.parse(localStorage.getItem("orders") || "{}");
    const userKey = user._id || user.email || "guest"; // ✅ use _id

    if (!allOrders[userKey]) allOrders[userKey] = [];
    allOrders[userKey].push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    clearCart(); // ✅ empty cart
    alert("✅ Your order has been confirmed!");

    // navigate to order history with refresh state
    navigate("/home", { state: { refresh: true } });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Delivery & Payment */}
        <div className="flex-1 space-y-6">
          {/* Delivery Details */}
          <div className="bg-[#272424] p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Delivery Details</h2>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Delivery Options</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="home"
                    checked={deliveryOption === "home"}
                    onChange={() => setDeliveryOption("home")}
                  />
                  Home Delivery
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="takeaway"
                    checked={deliveryOption === "takeaway"}
                    onChange={() => {
                      setDeliveryOption("takeaway");
                      setDeliveryTip(0);
                    }}
                  />
                  Take Away
                </label>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-400 mb-2">Delivery Address</label>
              {editingAddress ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 bg-[#1c1c1c] rounded"
                  />
                  <button
                    className="bg-orange-500 px-3 rounded"
                    onClick={() => setEditingAddress(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="bg-[#1c1c1c] p-4 rounded flex items-center justify-between">
                  <span>{address}</span>
                  <button
                    className="text-orange-500"
                    onClick={() => setEditingAddress(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          {deliveryOption === "home" && (
            <div className="bg-[#272424] p-6 rounded-lg">
              <h2 className="font-semibold text-lg mb-4">Delivery Man Tips</h2>
              <input
                type="number"
                className="w-full p-2 bg-[#1c1c1c] rounded text-white"
                placeholder="Amount"
                value={deliveryTip}
                onChange={(e) => setDeliveryTip(Number(e.target.value) || 0)}
              />
              <div className="flex items-center gap-4 mt-4">
                {[10, 15, 20, 40].map((tip) => (
                  <button
                    key={tip}
                    className="bg-orange-500 px-3 py-1 rounded"
                    onClick={() => setDeliveryTip(tip)}
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Payment Options */}
          <div className="bg-[#272424] p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Payment Options</h2>
            <label className="flex items-center gap-2">
              <input type="radio" name="paymentOption" defaultChecked />
              Cash On Delivery
            </label>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="flex-1 bg-[#272424] p-6 rounded-lg">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

          {cartItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-[#1c1c1c] p-4 rounded mb-3"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p>Qty: {item.qty}</p>
                <p className="text-orange-500 font-bold">
                  ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT/TAX</span>
              <span>+₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge</span>
              <span>+₹{serviceCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            {deliveryOption === "home" && (
              <div className="flex justify-between">
                <span>Delivery Tip</span>
                <span>+₹{deliveryTip.toFixed(2)}</span>
              </div>
            )}
          </div>

          <hr className="border-gray-700 my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              I agree to the Terms and Conditions & Privacy Policy
            </label>
          </div>

          <button
            className={`w-full py-3 rounded mt-4 font-bold ${
              agree ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-600"
            }`}
            onClick={handlePlaceOrder}
            disabled={!agree}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
