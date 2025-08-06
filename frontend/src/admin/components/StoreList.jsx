import { useState } from "react";

function StoreList() {
  const [stores, setStores] = useState([
    { id: 1, name: "Dominos", Earnings: 200, Productcount: 4, Vendor: "Ranjith" },
    { id: 2, name: "KFC", Earnings: 200, Productcount: 6, Vendor: "Ranjith" },
    { id: 3, name: "Pizza Hut", Earnings: 250, Productcount: 5, Vendor: "Arun" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    Earnings: "",
    Productcount: "",
    Vendor: ""
  });

  const handleDelete = (id) => {
    setStores(stores.filter((store) => store.id !== id));
  };

  const handleEdit = (store) => {
    setEditId(store.id);
    setEditForm({
      name: store.name,
      Earnings: store.Earnings,
      Productcount: store.Productcount,
      Vendor: store.Vendor
    });
  };

  const handleSave = (id) => {
    setStores(stores.map((store) =>
      store.id === id ? { ...store, ...editForm } : store
    ));
    setEditId(null);
  };

  // Filter stores by searchTerm (match name or vendor)
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.Vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl text-center font-semibold mb-4">Store List</h2>

      {/* 🔍 Search box */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by store name or vendor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
      </div>
                      
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b">
            <th className="py-2">ID</th>
            <th>Name</th>
            <th>Earnings</th>
            <th>Product count</th>
            <th>Vendor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id} className="text-center border-t">
              {editId === store.id ? (
                <>
                  <td>{store.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.Earnings}
                      onChange={(e) => setEditForm({ ...editForm, Earnings: e.target.value })}
                      className="border p-1 rounded w-20"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.Productcount}
                      onChange={(e) => setEditForm({ ...editForm, Productcount: e.target.value })}
                      className="border p-1 rounded w-20"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.Vendor}
                      onChange={(e) => setEditForm({ ...editForm, Vendor: e.target.value })}
                      className="border p-1 rounded"
                    />
                  </td>
                  <td>
                    <button
                      className="text-green-600 mr-2"
                      onClick={() => handleSave(store.id)}
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
                  <td>{store.id}</td>
                  <td className="py-2">{store.name}</td>
                  <td>{store.Earnings}</td>
                  <td>{store.Productcount}</td>
                  <td>{store.Vendor}</td>
                  <td>
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEdit(store)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(store.id)}
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

      {/* Optional: No results */}
      {filteredStores.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No stores found matching your search.</p>
      )}
    </div>
  );
}

export default StoreList;
