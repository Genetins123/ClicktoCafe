import { useState } from "react";
import Sidebar from "./Sidebar";
import AddFood from "./AddFood";
import AddStore from "./AddStore";
import FoodList from "./FoodList";
import StoreList from "./StoreList";
import Dashboard from "./Dashboard";

function Admin() {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar onMenuSelect={setSelectedMenu} />
      <div className="flex-1 overflow-y-auto p-4">
        
        {selectedMenu === "Dashboard" && <Dashboard />}
        {selectedMenu === "Add Food" && <AddFood />}
        {selectedMenu === "Add Store" && <AddStore />}
        {selectedMenu === "Food List" && <FoodList />}
        {selectedMenu === "Store List" && <StoreList />}
      </div>
    </div>
  );
}

export default Admin;
