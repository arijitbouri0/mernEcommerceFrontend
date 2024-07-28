import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductCard = (product) => {


    return (
        <div className='bg-white rounded-md shadow-md p-3 mb-4'>
            <div className="relative group">
                <NavLink to={`/product/id/${product.id}`}>
                    <div className="overflow-hidden aspect-w-1 aspect-h-1">
                        <img className="object-cover transition-all duration-300 group-hover:scale-125 w-full h-48 sm:h-80" src={product.Img} alt={product.title} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm font-bold text-gray-900 sm:text-base md:text-lg">
                            {product.title}
                        </h3>
                        <div className="flex items-center mt-2 space-x-1">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${index < 3 ? 'text-yellow-400' : 'text-gray-300'}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">${product.price}</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default ProductCard;
