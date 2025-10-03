import React, { useState } from "react";

import FoodsGrid from "../component/FoodsGrid"; // imported updated grid

const Fliter = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filterButtons = [
    "Veg",
    "Non-Veg",
    "Ratings 4 +",
    "New Arrivals",
    "Discounted",
    "Popular",
  ];

  return (
    <div>
      <section className="text-white container mx-auto max-w-6xl pt-4 relative">
        <h2 className="text-xl font-bold mb-6">
          Find Best Restaurants and Foods
        </h2>

        {/* filter buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {filterButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() =>
                setActiveFilter(activeFilter === btn ? null : btn)
              }
              className={`px-4 py-2 rounded-2xl transition ${
                activeFilter === btn
                  ? "bg-orange-500 text-white"
                  : "text-white text-opacity-50 border border-gray-600"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* conditional render */}
        {activeFilter ? (
          <FoodsGrid activeFilter={activeFilter} />
        ) : (
          <>
        
          </>
        )}
      </section>

    </div>
  );
};

export default Fliter;
