function AddFood() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Food</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Food Name" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Price" className="w-full border p-2 rounded" />
        <input type="file" placeholder="Upload Imgae" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Category" className="w-full border p-2 rounded" />
        <input type="text" placeholder=" Store" className="w-full border p-2 rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
