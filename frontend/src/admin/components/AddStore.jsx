function AddStore() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Store Name" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Address" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Email" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Phone Number" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Vendor" className="w-full border p-2 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Store
        </button>
      </form>
    </div>
  );
}

export default AddStore;
