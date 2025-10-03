import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Header1 = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const headerRef = useRef(null);

  const menuItems = {
    categories: [
      { name: "American", count: 3 },
      { name: "Caribbean", count: 4 },
      { name: "Fast Food", count: 6 },
      { name: "Indian", count: 5 },
      { name: "Chinese", count: 3 },
      { name: "Italian", count: 5 },
    ],
    cuisines: [
      { name: "Bengali" },
      { name: "Japanese" },
      { name: "Indian" },
      { name: "Spanish" },
      { name: "Chinese" },
      { name: "Italian" },
      { name: "Fast Food" },
      { name: "Sea Food" },
    ],
  };

  // Fetch restaurants and foods initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantsRes, foodsRes] = await Promise.all([
          fetch("http://localhost:5000/api/restaurants"),
          fetch("http://localhost:5000/api/foods"),
        ]);
        const restaurantsData = await restaurantsRes.json();
        const foodsData = await foodsRes.json();

        setRestaurantList(restaurantsData);
        setFoodList(foodsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const lowerQuery = searchTerm.toLowerCase();
const filteredRestaurants = restaurantList
  .filter((r) => r.name.toLowerCase().includes(lowerQuery))
  .map((r) => ({ ...r, type: "restaurant" }));  // ← add type

const filteredFoods = foodList
  .filter((f) => f.name.toLowerCase().includes(lowerQuery))
  .map((f) => ({ ...f, type: "food" }));  // ← add type

setSearchResults([...filteredRestaurants, ...filteredFoods]);

    setIsSearching(false);
  }, [searchTerm, restaurantList, foodList]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-[#292525] text-white p-3 fixed top-[48px] border-t border-t-black left-0 w-full z-40 shadow-md"
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        {/* Left Side Nav */}
        <nav className="flex gap-6 items-center">
          <a href="/home" className="hover:text-orange-400">
            Home
          </a>

          {/* Categories & Cuisines */}
          {["categories", "cuisines"].map((menu) => (
            <div key={menu} className="relative dropdown">
              <button
                className="flex items-center gap-1 hover:text-orange-400"
                onClick={() =>
                  setOpenMenu(openMenu === menu ? null : menu)
                }
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}{" "}
                <ChevronDown size={16} />
              </button>

              {openMenu === menu && (
                <div className="absolute top-full left-0 mt-2 w-[420px] bg-[#292525] border-[1px] border-gray-600 rounded-xl shadow-lg p-4 z-50 transition-all duration-200 ease-in-out">
                  <div className="grid grid-cols-2 gap-3">
                    {menuItems[menu].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
                      >
                        <img
                          src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png"
                          className="w-10 h-10 rounded-full object-cover"
                          alt=""
                        />
                        <span>
                          {item.name}{" "}
                          {item.count && (
                            <span className="text-gray-400">
                              ({item.count})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">
                    View all
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Restaurants Dropdown */}
          <div className="relative dropdown">
            <button
              className="flex items-center gap-1 hover:text-orange-400"
              onClick={() =>
                setOpenMenu(openMenu === "restaurants" ? null : "restaurants")
              }
            >
              Restaurants <ChevronDown size={16} />
            </button>

            {openMenu === "restaurants" && (
              <div className="absolute top-full left-0 w-[720px] bg-[#292525] rounded-xl border border-gray-600 shadow-lg p-6 grid grid-cols-3 gap-6 z-50 transition-all duration-200 ease-in-out">
                <div className="col-span-2 grid grid-cols-2 gap-4 max-h-80 overflow-auto">
                  {restaurantList.length > 0 ? (
                    restaurantList.map((item, idx) => (
                      <Link
                        key={idx}
                        to={`/restaurant/${item._id}`}
                        className="flex gap-3 p-3 rounded-lg hover:bg-gray-700 items-center cursor-pointer transition"
                      >
                        <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">🍽</span>
                          )}
                        </div>
                        <p className="text-white font-medium">{item.name}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 col-span-2">No restaurants found</p>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg">
                  <img
                    src="https://stackfood-react.6amtech.com/_next/static/media/resturant.88ad40dd.png"
                    alt="Promotional"
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <Link to="/restaurant">
                    <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                      View all
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side - Search */}
        <div className="relative">
          <Search
            className="absolute text-sm left-3 top-2.5 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search foods and restaurants..."
            className="bg-[#0f172a] text-sm text-white pl-10 pr-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Autocomplete dropdown */}
          {searchTerm && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-[#292525] rounded-lg border border-gray-600 shadow-lg z-50 max-h-96 overflow-auto">
              {isSearching ? (
                <p className="p-2 text-gray-400 flex items-center gap-2">
                  <Loader2 className="animate-spin" /> Searching...
                </p>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item._id}
                    to={
                      item.type === "restaurant"
                        ? `/restaurant/${item._id}`
                        : `/food/${item._id}`
                    }
                      onClick={() => setSearchTerm("")} // 👈 add this line

                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg transition"
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-lg">🍽</span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">{item.name}</span>
                      <span className="text-gray-400 text-xs">
                        {item.type === "restaurant" ? "Restaurant" : "Food"}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="p-2 text-gray-400">No results found</p>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header1;
