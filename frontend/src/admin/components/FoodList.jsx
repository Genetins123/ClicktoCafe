import { useEffect, useState } from "react";

function AdminFoodList() {
  const [foods, setFoods] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    image_url: "",
    description: "",
    rating: "",
    offer: "",
  });

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/foods");
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Delete food
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;
    try {
      await fetch(`http://localhost:5000/api/foods/${id}`, { method: "DELETE" });
      setFoods(foods.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Error deleting food:", err);
    }
  };

  // Start editing
  const handleEdit = (food) => {
    setEditId(food._id);
    setEditForm({
      name: food.name,
      price: food.price,
      category: food.category,
      image_url: food.image_url,
      description: food.description || "",
      rating: food.rating || 0,
      offer: food.offer || 0,
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setEditForm({
      name: "",
      price: "",
      category: "",
      image_url: "",
      description: "",
      rating: "",
      offer: "",
    });
  };

  // Save changes
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/foods/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const updated = await res.json();

      setFoods(
        foods.map((f) => (f._id === id ? { ...f, ...updated.data } : f))
      );
      setEditId(null);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Food List</h2>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4">Rating</th>
            <th className="py-3 px-4">Offer (%)</th>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Restaurant</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food, index) => (
            <tr key={food._id} className="border-b hover:bg-gray-50 text-center">
              <td className="py-2 px-4">{index + 1}</td>

              {editId === food._id ? (
                <>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.rating}
                      onChange={(e) =>
                        setEditForm({ ...editForm, rating: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={editForm.offer}
                      onChange={(e) =>
                        setEditForm({ ...editForm, offer: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.image_url}
                      onChange={(e) =>
                        setEditForm({ ...editForm, image_url: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4">{food.name}</td>
                  <td className="py-2 px-4">₹{food.price}</td>
                  <td className="py-2 px-4">{food.category}</td>
                  <td className="py-2 px-4">{food.description || "-"}</td>
                  <td className="py-2 px-4">{food.rating || 0}</td>
                  <td className="py-2 px-4">{food.offer || 0}%</td>
                  <td className="py-2 px-4">
                    {food.image_url ? (
                      <img
                        src={food.image_url}
                        alt={food.name}
                        className="h-12 w-12 object-cover rounded-full mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                </>
              )}

              <td className="py-2 px-4 font-medium">
                {food.restaurant?.name || "N/A"}
              </td>

              <td className="py-2 px-4 space-x-2">
                {editId === food._id ? (
                  <>
                    <button
                      onClick={() => handleSave(food._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(food)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {foods.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No foods found.</p>
      )}
    </div>
  );
}

export default AdminFoodList;
