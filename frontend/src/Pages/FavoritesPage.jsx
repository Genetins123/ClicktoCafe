import Header from "../component/Header";
import { Star } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <>
      {/* <Header /> */}
      <div className="max-w-5xl bg-[#fff] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-orange-500">My Favorites ❤️</h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No favorite foods added yet.
          </p>
        ) : (
          <div className="space-y-6">
            {favorites.map((food) => (
              <div
                key={food._id}
                className="flex justify-between items-start border-b pb-4"
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-lg font-semibold text-black">
                    {food.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">₹{food.price}</p>
                  <div className="flex items-center text-yellow-500 text-sm mt-1">
                    <Star size={14} className="mr-1" />
                    {food.rating?.toFixed(1) || "0.0"}
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {food.description}
                  </p>
                </div>

                <div className="w-28 flex flex-col items-center">
                  <img
                    src={food.image_url || "https://via.placeholder.com/150"}
                    alt={food.name}
                    className="w-full h-24 object-cover rounded-lg border"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FavoritesPage;
