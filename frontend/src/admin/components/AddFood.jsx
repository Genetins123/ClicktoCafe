import { useState, useRef } from "react";

function AddFood() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    store: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null); // for resetting file input

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // preview image
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("store", formData.store);
    data.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/food/add", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to add food");

      setSuccessMsg("🎉 Food item added successfully!");
      setErrorMsg("");
      setFormData({
        name: "",
        price: "",
        category: "",
        store: "",
        image: null,
      });
      setImagePreview(null);
      fileInputRef.current.value = null; // reset file input
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Error adding food item. Please try again.");
      setSuccessMsg("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Food</h2>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          ref={fileInputRef}
          accept="image/*"
          required
        />

        {/* 🖼 Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-32 object-cover rounded border"
          />
        )}

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="store"
          value={formData.store}
          onChange={handleChange}
          placeholder="Store"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}

export default AddFood;
