// src/pages/AboutPage.js
import React from 'react';
import { FaTruck, FaRocket, FaCalendarAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-500 py-28 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-10 overflow-hidden border-r-4 border-white whitespace-nowrap animate-typewriter">
          About Us
        </h1>
        
        {/* Our Story */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
          <h2 className="text-3xl font-semibold mb-4 flex items-center text-blue-600">
            <FaRocket className="text-blue-500 mr-2" /> Our Story
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our journey began in 2024 with a simple idea: to provide high-quality products at affordable prices.
            Over the years, we have grown into a trusted name in the e-commerce industry, thanks to our commitment
            to excellence and customer satisfaction.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-12 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
          <h2 className="text-3xl font-semibold mb-4 flex items-center text-green-600">
            <FaTruck className="text-green-500 mr-2" /> Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to make online shopping a seamless and enjoyable experience for everyone. We strive to
            offer a diverse range of products that cater to the needs and preferences of our customers. Our team is
            dedicated to providing exceptional service and support to ensure your satisfaction.
          </p>
        </section>

        {/* Published Year */}
        <section className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
          <h2 className="text-3xl font-semibold mb-4 flex items-center text-red-600">
            <FaCalendarAlt className="text-red-500 mr-2" /> Published Year
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            This website was launched in the year 2024, marking a significant milestone in our journey. We are excited to continue serving our customers with the best products and services.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
