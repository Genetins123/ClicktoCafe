import { useState } from "react";
function Sidebar({ onMenuSelect }) {
  const menus = [
    "Dashboard",
    "Add Food",
    "Add Store",
    "Food List",
    "Store List",
  ];

  return (
    <div className="w-48 bg-gray-800 text-white h-screen">
      <h1 className="text-lg font-bold p-4 border-b border-gray-700">Admin Panel</h1>
      {menus.map((menu) => (
        <div
          key={menu}
          onClick={() => onMenuSelect(menu)}
          className="p-4 hover:bg-gray-700 cursor-pointer"
        >
          {menu}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
