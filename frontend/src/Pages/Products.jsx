import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Products = () => {
  return (
    <div className="flex flex-col h-screen">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex justify-center items-center border border-red-800 w-full">
        <div className="flex flex-col items-center justify-center p-4 border border-red-800">
         <p>Products</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Products;
