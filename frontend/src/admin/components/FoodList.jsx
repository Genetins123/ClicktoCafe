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
      <h2 className="text-2xl text-center text-orange-500 font-bold mb-6">Food List</h2>

      <table className="min-w-full bg-white shadow rounded overflow-hidden text-sm">
  <thead>
    <tr className="bg-gray-200 text-gray-700 text-center text-sm">
      <th className="py-2 px-2">#</th>
      <th className="py-2 px-2">Name</th>
      <th className="py-2 px-2">Price</th>
      <th className="py-2 px-2">Category</th>
      <th className="py-2 px-2">Description</th>
      <th className="py-2 px-2">Rating</th>
      <th className="py-2 px-2">Offer (%)</th>
      <th className="py-2 px-2">Image</th>
      <th className="py-2 px-2">Restaurant</th>
      <th className="py-2 px-2">Actions</th>
    </tr>
  </thead>

  <tbody>
    {foods.map((food, index) => (
      <tr key={food._id} className="border-b hover:bg-gray-50 text-center text-sm">
        <td className="py-1 px-2">{index + 1}</td>

        {editId === food._id ? (
          <>
            <td className="py-1 px-2">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="text"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="text"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="number"
                step="0.1"
                value={editForm.rating}
                onChange={(e) =>
                  setEditForm({ ...editForm, rating: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="number"
                value={editForm.offer}
                onChange={(e) =>
                  setEditForm({ ...editForm, offer: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
            <td className="py-1 px-2">
              <input
                type="text"
                value={editForm.image_url}
                onChange={(e) =>
                  setEditForm({ ...editForm, image_url: e.target.value })
                }
                className="border px-1 py-1 rounded w-full text-sm"
              />
            </td>
          </>
        ) : (
          <>
            <td className="py-1 px-2">{food.name}</td>
            <td className="py-1 px-2">₹{food.price}</td>
            <td className="py-1 px-2">{food.category}</td>
            <td className="py-1 px-2">{food.description || "-"}</td>
            <td className="py-1 px-2">{food.rating || 0}</td>
            <td className="py-1 px-2">{food.offer || 0}%</td>
            <td className="py-1 px-2">
              {food.image_url ? (
                <img
                  src={food.image_url}
                  alt={food.name}
                  className="h-8 w-8 object-cover rounded-full mx-auto"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </td>
          </>
        )}

        <td className="py-1 px-2 font-medium text-sm">
          {food.restaurant?.name || "N/A"}
        </td>

        <td className="py-1 px-2 space-x-1">
          {editId === food._id ? (
            <>
              <button
                onClick={() => handleSave(food._id)}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEdit(food)}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(food._id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
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
