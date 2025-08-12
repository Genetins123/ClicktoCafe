import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

function Takeaway() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null); // optional error state

  // 🔁 Fetch food data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/food")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch food data");
        setLoading(false);
      });
  }, []);

  // 🔍 Filter foods by search term
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Takeaway Menu</h2>

        {/* 🔍 Search box */}
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search food or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full max-w-md"
          />
        </div>

        {/* ⏳ Loading */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* ❌ Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* 🍔 Food cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredFoods.map((food) => (
              <div key={food.id} className="bg-white rounded shadow hover:shadow-lg">
<img
      src={`http://localhost:5000/api/food/${food._id}/image`}
      alt={food.name}
      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
    />                <div className="p-4">
                  <h3 className="font-bold text-lg">{food.name}</h3>
                  <p className="text-gray-600">{food.category}</p>
                  <p className="mt-2 font-semibold">₹{food.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ⚠️ No result */}
        {!loading && !error && filteredFoods.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No foods found matching your search.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Takeaway;
