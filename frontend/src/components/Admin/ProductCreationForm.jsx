import React, { useState } from "react";
import { toast } from "sonner";

const ProductCreationForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    category: "",
    brand: "",
    sizes: "",
    colors: "",
    collections: "",
    material: "",
    gender: "",
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: "",
    dimensions: { length: "", width: "", height: "" },
    weight: "",
    sku: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      dimensions: {
        ...prevProduct.dimensions,
        [name]: value,
      },
    }));
  };

  // Handle image selection and show previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: files,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const uploadedImageUrls = [];
  
      // Ensure product.images is an array
      if (Array.isArray(product.images)) {
        for (const file of product.images) {
          const formData = new FormData();
          formData.append("image", file); // this must match upload.single("image")
  
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
            method: "POST",
            body: formData,
          });
  
          const data = await res.json();
  
          if (!res.ok) {
            throw new Error(data.error || "Image upload failed");
          }
  
          uploadedImageUrls.push(data.imageUrl);
        }
      }
  
      // Step 2: Construct full product payload
      const productPayload = {
        ...product,
        images: uploadedImageUrls.map((url) => ({ url })), // Image URLs
        sizes: product.sizes.split(",").map((s) => s.trim()),
        colors: product.colors.split(",").map((c) => c.trim()),
        tags: product.tags.split(",").map((t) => t.trim()),
  
        // Ensure collections is an array before join
        collections: Array.isArray(product.collections)
          ? product.collections.join(", ") // Convert array to a comma-separated string
          : product.collections, // If already a string, keep as it is
  
        dimensions: {
          length: parseFloat(product.dimensions.length),
          width: parseFloat(product.dimensions.width),
          height: parseFloat(product.dimensions.height),
        },
        weight: parseFloat(product.weight),
        price: parseFloat(product.price),
        discountPrice: parseFloat(product.discountPrice),
        countInStock: parseInt(product.countInStock),
        sku: product.sku,
        isFeatured: product.isFeatured,
        isPublished: product.isPublished,
        gender: product.gender,
        material: product.material,
        category: product.category,
        brand: product.brand,
        description: product.description,
        name: product.name,
      };
  
      // Step 3: Send product creation request to your backend
      const createRes = await fetch(`${import.meta.env.VITE_BASE_URL}/products/create-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(productPayload),
      });
  
      const createData = await createRes.json();
  
      if (createRes.ok) {
        toast.success("Product created successfully!");
  
        // Reset form
        setProduct({
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          countInStock: "",
          category: "",
          brand: "",
          sizes: "",
          colors: "",
          collections: [],
          material: "",
          gender: "",
          images: [],
          isFeatured: false,
          isPublished: false,
          tags: "",
          dimensions: { length: "", width: "", height: "" },
          weight: "",
          sku: "",
        });
      } else {
        toast.error(createData?.message || "Something went wrong while creating the product.");
      }
    } catch (error) {
      console.error("Error during product submission:", error);
      toast.error("Something went wrong while creating the product.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>

        {/* Grid format for the next set of fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Discount Price */}
          <div>
            <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              id="discountPrice"
              value={product.discountPrice}
              onChange={handleChange}
              placeholder="Enter discount price (optional)"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Stock Count */}
          <div>
            <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700">Stock Count</label>
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={product.countInStock}
              onChange={handleChange}
              placeholder="Enter stock count"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
        </div>

        {/* SKU */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            value={product.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            id="gender"
            value={product.gender}
            onChange={handleChange}
            placeholder="Enter gender"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Enter tags"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            multiple
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>

        {/* Grid format for the next set of fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Enter product category"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Enter product brand"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Sizes */}
          <div>
            <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes (comma-separated)</label>
            <input
              type="text"
              name="sizes"
              id="sizes"
              value={product.sizes}
              onChange={handleChange}
              placeholder="Enter available sizes"
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
        </div>

        {/* Grid format for the next set of fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Colors */}
          <div>
            <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colors (comma-separated)</label>
            <input
              type="text"
              name="colors"
              id="colors"
              value={product.colors}
              onChange={handleChange}
              placeholder="Enter available colors"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Collections */}
          <div>
            <label htmlFor="collections" className="block text-sm font-medium text-gray-700">Collections</label>
            <input
               type="text"
               name="collections"
               id="collections"
               value={product.collections}
               onChange={handleChange}
               placeholder="Enter collections (comma separated)"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          {/* Material */}
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material</label>
            <input
              type="text"
              name="material"
              id="material"
              value={product.material}
              onChange={handleChange}
              placeholder="Enter product material"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
        </div>

        {/* Dimensions (Length, Width, Height) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length</label>
            <input
              type="text"
              name="length"
              id="length"
              value={product.dimensions.length}
              onChange={handleDimensionChange}
              placeholder="Enter product length"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width</label>
            <input
              type="text"
              name="width"
              id="width"
              value={product.dimensions.width}
              onChange={handleDimensionChange}
              placeholder="Enter product width"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
            <input
              type="text"
              name="height"
              id="height"
              value={product.dimensions.height}
              onChange={handleDimensionChange}
              placeholder="Enter product height"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
         <button
  type="submit"
  className="w-full px-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={loading}
>
  {loading ? "Creating Product..." : "Create Product"}
</button>

        </div>
      </form>
    </div>
  );
};

export default ProductCreationForm;
