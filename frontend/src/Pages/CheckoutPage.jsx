import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFood } = location.state || {};

  const [deliveryOption, setDeliveryOption] = useState("home");
  const [deliveryTip, setDeliveryTip] = useState(0);

  if (!selectedFood) {
    return (
      <div className="text-white p-8">
        <p>No food selected. Please go back and select a food.</p>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/home")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const subtotal = selectedFood.price * (selectedFood.quantity || 1);
  const discount = selectedFood.oldPrice
    ? selectedFood.oldPrice - selectedFood.price
    : 0;
  const tax = subtotal * 0.09;
  const serviceCharge = 10;
  const deliveryFee = deliveryOption === "home" ? 0 : 0;
  const total =
    subtotal - discount + tax + serviceCharge + deliveryFee + deliveryTip;
 const handlePlaceOrder = () => {
  const user = JSON.parse(localStorage.getItem("user")); // 👈 current logged in user
  if (!user) {
    alert("Please login to place order!");
    navigate("/login");
    return;
  }

  alert("✅ Your order has been confirmed!");

  const orderDetails = {
    food: selectedFood,
    subtotal,
    discount,
    tax,
    serviceCharge,
    deliveryFee,
    deliveryTip,
    total,
    deliveryOption,
    address: "Q972+VPF, Dhaka, Bangladesh",
    payment: "Cash On Delivery",
    date: new Date().toLocaleString(),
  };

  // 🔥 Save order under specific user
  const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
  if (!allOrders[user.id]) {
    allOrders[user.id] = [];
  }
  allOrders[user.id].push(orderDetails);
  localStorage.setItem("orders", JSON.stringify(allOrders));

  navigate("/orders");
};

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side */}
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

            <div>
              <label className="block text-gray-400 mb-2">Delivery Address</label>
              <div className="bg-[#1c1c1c] p-4 rounded flex items-center justify-between">
                <span>Q972+VPF, Dhaka, Bangladesh</span>
                <button className="text-orange-500">Edit</button>
              </div>
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

          <div className="flex items-center gap-4 bg-[#1c1c1c] p-4 rounded">
            <img
              src={selectedFood.img}
              alt={selectedFood.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold text-white">{selectedFood.title}</h3>
              <p>Qty: {selectedFood.quantity || 1}</p>
              <p className="text-orange-500 font-bold">${selectedFood.price}</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT/TAX</span>
              <span>+${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Charge</span>
              <span>+$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            {deliveryOption === "home" && (
              <div className="flex justify-between">
                <span>Delivery Man Tip</span>
                <span>+${deliveryTip.toFixed(2)}</span>
              </div>
            )}
          </div>

          <hr className="border-gray-700 my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              I agree to the Terms and Conditions & Privacy Policy
            </label>
          </div>

          <button
            className="w-full bg-orange-500 text-white py-3 rounded mt-4"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
