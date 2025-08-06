import { useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

function Takeaway() {
  const [searchTerm, setSearchTerm] = useState("");

  const [foods] = useState([
    { id: 1, name: "Chicken Biryani", price: 220, category: "Main Course", image: "https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg" },
    { id: 2, name: "Veg Pizza", price: 180, category: "Fast Food", image: "https://www.thursdaynightpizza.com/wp-content/uploads/2022/06/veggie-pizza-overhead-sliced.png" },
    { id: 3, name: "Pasta", price: 150, category: "Fast Food", image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/11/red-sauce-pasta-1.jpg" },
    { id: 4, name: "Paneer Butter Masala", price: 190, category: "Main Course", image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg" },
    { id: 5, name: "French Fries", price: 100, category: "Snacks", image: "https://sausagemaker.com/wp-content/uploads/Homemade-French-Fries_8.jpg" },
    { id: 6, name: "Momos", price: 120, category: "Snacks", image: "https://tarasmulticulturaltable.com/wp-content/uploads/2019/07/Meat-Filled-Momos-9-of-10.jpg" },
  ]);

  // Filter foods by search term
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFoods.map((food) => (
            <div key={food.id} className="bg-white rounded shadow hover:shadow-lg">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{food.name}</h3>
                <p className="text-gray-600">{food.category}</p>
                <p className="mt-2 font-semibold">₹{food.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: No results */}
        {filteredFoods.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No foods found matching your search.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Takeaway;
