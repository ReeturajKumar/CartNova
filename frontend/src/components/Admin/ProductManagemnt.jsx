import React, { useState } from "react";
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const products = [
    { _id: 1, name: "Product 1", price: 1000, sku: "SKU001" },
    { _id: 2, name: "Product 2", price: 1500, sku: "SKU002" },
    { _id: 3, name: "Product 3", price: 2000, sku: "SKU003" },
    { _id: 4, name: "Product 4", price: 1200, sku: "SKU004" },
    { _id: 5, name: "Product 5", price: 1800, sku: "SKU005" },
    { _id: 6, name: "Product 6", price: 1100, sku: "SKU006" },
    { _id: 7, name: "Product 7", price: 1700, sku: "SKU007" },
    { _id: 8, name: "Product 8", price: 1600, sku: "SKU008" },
  ];

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
    console.log(`Deleting product ${id}`);
   }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Product Management
      </h1>

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
