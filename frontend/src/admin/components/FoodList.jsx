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
    imageFile: null
  });

  // Fetch data from API
  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food");
      const data = await res.json();
      const updatedFoods = data.map((food) => ({
        ...food,
        image: `http://localhost:5000/api/food/${food._id}/image`
      }));
      setFoods(updatedFoods);
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Dynamic category list
  const categories = [...new Set(foods.map((food) => food.category))];

  // Delete food from DB
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/food/${id}`, { method: "DELETE" });
      setFoods(foods.filter((food) => food._id !== id));
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
      store: food.store,
      imageFile: null
    });
  };

  // Save edited food to DB
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
        body: formData
      });
      await fetchFoods();
      setEditId(null);
    } catch (err) {
      console.error("Error updating food:", err);
    }
  };

  // Filter foods
  const filteredFoods = foods.filter(
    (food) =>
      (food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.store.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || food.category === selectedCategory)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Food List</h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Category</th>
            <th>Store</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((food) => (
            <tr key={food._id} className="text-center border-t">
              {editId === food._id ? (
                <>
                  <td className="py-2">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          imageFile: e.target.files[0]
                        })
                      }
                      className="border p-1 rounded w-40"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) =>
                        setEditForm({ ...editForm, price: e.target.value })
                      }
                      className="border p-1 rounded w-20"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.store}
                      onChange={(e) =>
                        setEditForm({ ...editForm, store: e.target.value })
                      }
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <button
                      className="text-green-600 mr-2"
                      onClick={() => handleSave(food._id)}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-600"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2">{food.name}</td>
                  <td className="py-2">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{food.price}</td>
                  <td>{food.category}</td>
                  <td>{food.store}</td>
                  <td>
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEdit(food)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(food._id)}
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
        <p className="text-center text-gray-500 mt-4">
          No foods found matching your search/filter.
        </p>
      )}
    </div>
  );
}

export default FoodList;
