  import { useState } from "react";

  function AddRestaurant() {
    const [formData, setFormData] = useState({
      name: "",
      image_url: "",
      cuisine: "",
      rating: "",
      delivery_time: "",
      price_range: "",
      offer: "",
      delivery_type: ""
    });

    const [message, setMessage] = useState(null); // 👈 message state
    const [error, setError] = useState(null);     // 👈 error state

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await fetch("http://localhost:5000/api/restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Restaurant added successfully!");
          setError(null);
          setFormData({   // reset form
            name: "",
            image_url: "",
            cuisine: "",
            rating: "",
            delivery_time: "",
            price_range: "",
            offer: "",
            delivery_type: ""
          });
        } else {
          setError(data.message || "Failed to add restaurant");
          setMessage(null);
        }
      } catch (err) {
        setError("Something went wrong!");
        setMessage(null);
      }
    };

    return (
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Restaurant</h2>

        {/* Success / Error Messages 👇 */}
        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} placeholder="Restaurant Name" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input type="text" name="image_url" value={formData.image_url} placeholder="Image URL" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input type="text" name="cuisine" value={formData.cuisine} placeholder="Cuisine (e.g. Pizza, Italian)" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input type="number" step="0.1" name="rating" value={formData.rating} placeholder="Rating (e.g. 4.2)" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input type="text" name="delivery_time" value={formData.delivery_time} placeholder="Delivery Time (e.g. 30-35 mins)" className="w-full border p-2 rounded" onChange={handleChange} required />
          <input type="text" name="offer" value={formData.offer} placeholder="Offer (e.g. 50% OFF up to ₹100)" className="w-full border p-2 rounded" onChange={handleChange} />
          <input type="text" name="delivery_type" value={formData.delivery_type} placeholder="Delivery Type (e.g. FREE DELIVERY)" className="w-full border p-2 rounded" onChange={handleChange} />

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
            Add Restaurant
          </button>
        </form>
      </div>
    );
  }

  export default AddRestaurant;
