import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from "../../redux/slice/adminProductSllice";

const ProductManagement = () => {


  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProduct);




  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  const handleDelete = (id) => {
   if(window.confirm("Are you sure you want to delete this product?")){
    dispatch(deleteProduct(id));
   }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Product Management
      </h1>
      <Link to="/admin-panel/products/product-creation">
      <button className="w-full px-6  bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer">
        Add Product
      </button>
      </Link>

      </div>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="min-w-full text-left text-gray-900">
          <thead className="bg-gray-300 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-4 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  ${product.price}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{product.sku}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:underline mr-4 cursor-pointer">
                   <Link to={`/admin-panel/products/${product._id}/edit`}>Edit</Link>
                  </button>
                  <button className="text-red-600 hover:underline cursor-pointer" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200   text-sm font-medium rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
