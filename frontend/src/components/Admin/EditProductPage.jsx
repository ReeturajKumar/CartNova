import React, { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    desc: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setProductData({
    //     ...productData,
    //     images: [...productData.images, { url: reader.result }],
    //   });
    // };
    // reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", productData);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="desc"
            value={productData.desc}
            onChange={handleChange}
            placeholder="Product description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          {/* Count In Stock */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              placeholder="Count in Stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="SKU"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sizes
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e) => {
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                });
              }}
              placeholder="e.g. S, M, L, XL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Colors
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(", ")}
              onChange={(e) => {
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                });
              }}
              placeholder="e.g. Red, Black, Blue, Green"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Upload Image - spans both columns */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>
            <input type="file" onChange={handleUploadImage} required />
            <div className="flex flex-wrap gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={`Product Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
