import { useState, useEffect } from "react";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    store: "",
    imageFile: null,
  });

  // Fetch data
  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food");
      const data = await res.json();
      const updatedFoods = data.map((food) => ({
        ...food,
        image: `http://localhost:5000/api/food/${food._id}/image`,
      }));
      setFoods(updatedFoods);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Categories
  const categories = [...new Set(foods.map((food) => food.category))];

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        await fetch(`http://localhost:5000/api/food/${id}`, {
          method: "DELETE",
        });
        setFoods((prev) => prev.filter((food) => food._id !== id));
      } catch (err) {
        console.error("Error deleting food:", err);
      }
    }
  };

  // Edit
  const handleEdit = (food) => {
    setEditId(food._id);
    setEditForm({
      name: food.name,
      price: food.price,
      category: food.category,
      store: food.store,
      imageFile: null,
    });
  };

  // Save
  const handleSave = async (id) => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("price", editForm.price);
    formData.append("category", editForm.category);
    formData.append("store", editForm.store);
    if (editForm.imageFile) {
      formData.append("image", editForm.imageFile);
    }

    try {
      await fetch(`http://localhost:5000/api/food/${id}`, {
        method: "PUT",
        body: formData,
      });
      await fetchFoods();
      setEditId(null);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  // Filtered foods
  const filteredFoods = foods.filter(
    (food) =>
      (food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.store.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || food.category === selectedCategory)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Food List</h2>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, category or store..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-xs"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Store</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((food) => (
            <tr
              key={food._id}
              className="border-b hover:bg-gray-50 text-center"
            >
              {editId === food._id ? (
                <>
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
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          imageFile: e.target.files[0],
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={editForm.store}
                      onChange={(e) =>
                        setEditForm({ ...editForm, store: e.target.value })
                      }
                      className="border p-1 rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleSave(food._id)}
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
                  <td className="py-2 px-4 font-medium">{food.name}</td>
                  <td className="py-2 px-4">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="h-12 w-12 object-cover rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4">{food.price}</td>
                  <td className="py-2 px-4">{food.category}</td>
                  <td className="py-2 px-4">{food.store}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(food)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
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

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No foods found matching your search/filter.
        </p>
      )}
    </div>
  );
}

export default FoodList;
