// src/pages/OrdersPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders") || "{}");
    const userKey = user._id || user.email || "guest"; // ✅ same key as CheckoutPage
    setOrders(allOrders[userKey] || []);
  }, [navigate, location.state?.refresh]); // refresh when redirected after placing order

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <p className="text-gray-400 mb-4">You have no orders yet.</p>
        <button
          className="bg-orange-500 px-4 py-2 rounded"
          onClick={() => navigate("/home")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      <div className="space-y-6">
        {orders.slice().reverse().map((order) => (
          <div key={order.id} className="bg-[#272424] p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Order ID: {order.id}</span>
              <span className="text-gray-400">{order.date}</span>
            </div>

            <div className="space-y-2">
              {order.cartItems.map((item) => (
                <div key={item.id} className="flex justify-between bg-[#1c1c1c] p-3 rounded">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.qty} {item.size && `| Size: ${item.size}`}
                    </p>
                  </div>
                  <div className="text-orange-500 font-bold">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-₹{order.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>+₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge:</span>
                <span>+₹{order.serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>₹{order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.deliveryOption === "home" && (
                <div className="flex justify-between">
                  <span>Delivery Tip:</span>
                  <span>+₹{order.deliveryTip.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 text-gray-400 text-sm">
              Delivery Option: {order.deliveryOption} | Address: {order.address}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
