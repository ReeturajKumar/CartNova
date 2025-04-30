import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slice/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    images: [],
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Store image as an object with the URL
      setProductData({
        ...productData,
        images: [...productData.images, { url: data.imageUrl, altText: "Uploaded Image" }],
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin-panel/products");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
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

        {/* Product Description */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
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
                  colors: e.target.value.split(",").map((color) => color.trim()),
                });
              }}
              placeholder="e.g. Red, Black, Blue, Green"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Upload Image */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>
            <input type="file" onChange={handleUploadImage} />
            <div className="flex flex-wrap gap-4 mt-4">
              {uploading && <p>Uploading...</p>}
              {productData.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
