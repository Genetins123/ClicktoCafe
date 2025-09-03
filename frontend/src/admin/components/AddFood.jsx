import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminAddFood() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image_url: "",
    restaurant: "",
    description: "",
    rating: "",
    offer: "",
  });

  const [restaurants, setRestaurants] = useState([]);

  // 🔹 Fetch restaurants for dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/restaurants");
        setRestaurants(res.data);
      } catch (error) {
        console.error("Failed to fetch restaurants", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/foods", formData);
      alert("✅ Food added successfully!");
      setFormData({
        name: "",
        price: "",
        category: "",
        image_url: "",
        restaurant: "",
        description: "",
        rating: "",
        offer: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add food");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* 🔹 New Fields */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
        />

        <input
          type="text"
          name="offer"
          placeholder="Offer (e.g. 20% OFF)"
          value={formData.offer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* 🔹 Restaurant Dropdown */}
        <select
          name="restaurant"
          value={formData.restaurant}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Restaurant --</option>
          {restaurants.map((rest) => (
            <option key={rest._id} value={rest._id}>
              {rest.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
