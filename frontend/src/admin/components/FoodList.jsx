import { useState } from "react";

function FoodList() {
  const [foods, setFoods] = useState([
    { id: 1, name: "Pizza", price: 200, category: "Fast Food", store: "Hotel A", image: "https://via.placeholder.com/60" },
    { id: 2, name: "Burger", price: 150, category: "Fast Food", store: "Hotel B", image: "https://via.placeholder.com/60" },
    { id: 3, name: "Biryani", price: 250, category: "Main Course", store: "Hotel A", image: "https://via.placeholder.com/60" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    store: "",
    image: ""
  });

  // 🧠 Dynamic category list
  const categories = [...new Set(foods.map(food => food.category))];

  // 🗑 Delete food
  const handleDelete = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  // ✏ Start editing
  const handleEdit = (food) => {
    setEditId(food.id);
    setEditForm({
      name: food.name,
      price: food.price,
      category: food.category,
      store: food.store,
      image: food.image
    });
  };

  // ✅ Save edited food
  const handleSave = (id) => {
    setFoods(foods.map((food) =>
      food.id === id ? { ...food, ...editForm } : food
    ));
    setEditId(null);
  };

  // 🔍 Filter by search + category
  const filteredFoods = foods.filter((food) =>
    (food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     food.store.toLowerCase().includes(searchTerm.toLowerCase()))
    &&
    (selectedCategory === "" || food.category === selectedCategory)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Food List</h2>

      {/* 🔍 Search & dynamic category filter */}
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
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

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
            <tr key={food.id} className="text-center border-t">
              {editId === food.id ? (
                <>
                
                  <td className="py-2">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border p-1 rounded"
                    />
                  </td>
                    <td className="py-2">
                    <input
                      type="text"
                      value={editForm.image}
                      onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                      className="border p-1 rounded w-24"
                      placeholder="Image URL"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="border p-1 rounded w-20"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.store}
                      onChange={(e) => setEditForm({ ...editForm, store: e.target.value })}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <button
                      className="text-green-600 mr-2"
                      onClick={() => handleSave(food.id)}
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
                    <img src={food.image} alt={food.name} className="w-12 h-12 object-cover rounded" />
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
                      onClick={() => handleDelete(food.id)}
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
        <p className="text-center text-gray-500 mt-4">No foods found matching your search/filter.</p>
      )}
    </div>
  );
}

export default FoodList;
