// src/components/ServiceComponent.js
import React from 'react';
import { FaTruck, FaShippingFast, FaHeadset } from 'react-icons/fa'; // Importing some icons

const Service = () => {
  return (
    <div className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Faster Delivery */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <FaShippingFast className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Faster Delivery</h3>
            <p className="text-gray-600">Get your products delivered swiftly.</p>
          </div>

          {/* Free Delivery */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <FaTruck className="mx-auto text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-600">Enjoy free delivery on all orders.</p>
          </div>

          {/* Excellent Support */}
          <div className="p-8 bg-white rounded-lg shadow-md">
            <FaHeadset className="mx-auto text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excellent Support</h3>
            <p className="text-gray-600">24/7 customer support for your needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
