import { useEffect, useState } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    image_url: "",
    cuisine: "",
    rating: "",
    delivery_time: "",
    offer: "",
    delivery_type: "",
  });

  // API fetch
  const fetchRestaurants = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/restaurants");
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Edit
  const handleEdit = (restaurant) => {
    setEditId(restaurant._id);
    setEditForm({
      name: restaurant.name,
      image_url: restaurant.image_url,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      delivery_time: restaurant.delivery_time,
      offer: restaurant.offer,
      delivery_type: restaurant.delivery_type,
    });
  };

  // Save
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        await fetchRestaurants();
        setEditId(null);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update restaurant");
      }
    } catch (err) {
      console.error("Error updating restaurant:", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setRestaurants((prev) => prev.filter((r) => r._id !== id));
        } else {
          const data = await res.json();
          alert(data.message || "Failed to delete");
        }
      } catch (err) {
        console.error("Error deleting restaurant:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Restaurant List</h2>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Cuisine</th>
            <th className="py-3 px-4">Rating</th>
            <th className="py-3 px-4">Delivery Time</th>
            <th className="py-3 px-4">Offer</th>
            <th className="py-3 px-4">Delivery Type</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr
              key={restaurant._id || index}
              className="border-b hover:bg-gray-50 text-center"
            >
              {editId === restaurant._id ? (
                <>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.image_url}
                      onChange={(e) =>
                        setEditForm({ ...editForm, image_url: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.cuisine}
                      onChange={(e) =>
                        setEditForm({ ...editForm, cuisine: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={editForm.rating}
                      onChange={(e) =>
                        setEditForm({ ...editForm, rating: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.delivery_time}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          delivery_time: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.offer}
                      onChange={(e) =>
                        setEditForm({ ...editForm, offer: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.delivery_type}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          delivery_type: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleSave(restaurant._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium">{restaurant.name}</td>
                  <td className="py-2 px-4">
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="h-12 w-12 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4">{restaurant.cuisine}</td>
                  <td className="py-2 px-4">{restaurant.rating}</td>
                  <td className="py-2 px-4">{restaurant.delivery_time}</td>
                  <td className="py-2 px-4">{restaurant.offer}</td>
                  <td className="py-2 px-4">{restaurant.delivery_type}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {restaurants.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No restaurants found.</p>
      )}
    </div>
  );
}

export default RestaurantList;
