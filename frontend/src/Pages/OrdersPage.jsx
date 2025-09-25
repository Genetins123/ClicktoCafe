    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";

    const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(savedOrders);
    }, []);

    if (orders.length === 0) {
        return (
        <div className="p-8 text-white">
            <p>No orders found.</p>
            <button
            className="bg-orange-500 px-4 py-2 rounded"
            onClick={() => navigate("/home")}
            >
            Go Home
            </button>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-6">
            {orders.map((order, index) => (
            <div key={index} className="bg-[#272424] p-6 rounded-lg space-y-4">
                <p><strong>Order Date:</strong> {order.date}</p>
                <p><strong>Delivery:</strong> {order.deliveryOption}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Payment:</strong> {order.payment}</p>

                <div className="flex items-center gap-4 bg-[#1c1c1c] p-4 rounded">
                <img
                    src={order.food.img}
                    alt={order.food.title}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h3 className="font-semibold">{order.food.title}</h3>
                    <p>Qty: {order.food.quantity || 1}</p>
                    <p className="text-orange-500 font-bold">${order.food.price}</p>
                </div>
                </div>

                <div className="mt-4">
                <p><strong>Total Paid:</strong> ${order.total.toFixed(2)}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default OrdersPage;
