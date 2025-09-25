import { useState, useEffect } from "react";
import Header from "../component/Header";
import FavoritesPage from "./FavoritesPage";
import OrdersPage from "./OrdersPage";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // ✅ Fetch login user from localStorage

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const data = await res.json();
      const updated = data.user || data; // backend la wrap panna case handle

      // ✅ Local storage update
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);

      // ✅ Form state update
      setFormData({
        name: updated.name || "",
        email: updated.email || "",
        phone: updated.phone || "",
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <>
     
      <div className="min-h-screen bg-[#f97316] ">
        {/* Banner */}

        <div className=" text-white p-6 flex justify-between items-center">
          
          <div>
            
            <h1 className="text-2xl  font-bold">{user?.username}</h1>
            <p>{user?.phone} · {user?.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="border border-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#1B3358]"
          >
            Edit Profile
          </button>
        </div>

        {/* Layout */}
        <div className="flex bg-[#1a1a1a] mx-auto  max-w-6xl">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md p-4 pb-60 space-y-4">
            <button 
              onClick={() => setActiveTab("orders")} 
              className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab==="orders" ? "bg-orange-100 text-orange-900" : ""}`}>
              Orders
            </button>
            <button 
              onClick={() => setActiveTab("favourites")} 
              className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab==="favourites" ? "bg-orange-100 text-orange-900" : ""}`}>
              Favourites
            </button>
            <button 
              onClick={() => setActiveTab("payments")} 
              className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab==="payments" ? "bg-orange-100 text-orange-900" : ""}`}>
              Payments
            </button>
            <button 
              onClick={() => setActiveTab("settings")} 
              className={`block w-full text-left px-3 py-2 rounded-lg ${activeTab==="settings" ? "bg-orange-100 text-orange-900" : ""}`}>
              Settings
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === "orders" && (
              <div>
                <OrdersPage />
                {/* <h2 className="text-xl font-bold mb-4">Your Orders</h2>
                <p className="text-gray-500">Your orders will be listed here.</p> */}
              </div>
            )}
            {activeTab === "favourites" && (
              <div>
                <FavoritesPage />
                {/* <h2 className="text-xl font-bold mb-4">Favourites</h2>
                <p className="text-gray-500">Your favourite items will be shown here.</p> */}
              </div>
            )}
            {activeTab === "payments" && (
              <div>
                <h2 className="text-xl text-white font-bold mb-4">Payments</h2>
                <p className="text-gray-500">Your payment methods will appear here.</p>
              </div>
            )}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl text-white font-bold mb-4">Settings</h2>
                <p className="text-gray-500">Update your account settings here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full border p-2 mb-3 rounded"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-900 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
