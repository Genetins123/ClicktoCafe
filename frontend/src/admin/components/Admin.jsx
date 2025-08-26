import { useState } from "react";
import Sidebar from "./Sidebar";
import AddFood from "./AddFood";
import FoodList from "./FoodList";
import Dashboard from "./Dashboard";
import AddRestaurant from "./AddRestaurant";
import RestaurantList from "./RestaurantList";

function Admin() {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar onMenuSelect={setSelectedMenu} />
      <div className="flex-1 overflow-y-auto p-4">
        
        {selectedMenu === "Dashboard" && <Dashboard />}
        {selectedMenu === "Add Food" && <AddFood />}
        {selectedMenu === "Add Store" && <AddRestaurant />}
        {selectedMenu === "Food List" && <FoodList />}
        {selectedMenu === "Store List" && <RestaurantList />}
      </div>
    </div>
  );
}

export default Admin;
