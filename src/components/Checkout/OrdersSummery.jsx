import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../Redux/Orders/Action';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {

  const dispatch=useDispatch();
  const location=useLocation();
  const navigate=useNavigate();
  const searchParams=new URLSearchParams(location.search);

  const {order}=useSelector(state=>state.order);
  const orderId=searchParams.get("order_id");
  useEffect(()=>{
    dispatch(getOrderById(orderId));
  },[dispatch])

  const handleProceedToPayment=()=>{
    navigate({search : `step=3&order_id=${orderId}`})
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      {/* Delivery Address Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
        <p className="text-md">{order?.shippingAddress?.firstname} {order?.shippingAddress?.lastname}</p>
        <p className="text-md">{order?.shippingAddress?.address}</p>
        <p className="text-md">{`${order?.shippingAddress?.state} ${order?.shippingAddress?.pincode}`}</p>
        <p className="text-md">{`Phone: ${order?.shippingAddress?.mobile}`}</p>
        <p className="text-md">{`Email: ${order?.shippingAddress?.email}`}</p>
      </div>
      
      {/* Cart Items Section */}
      <div className="mb-4">
        {order?.orderItems?.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="flex items-center">
              <img src={item.product.imageUrl} alt={item.product.title} className="w-12 h-12 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-semibold">${item.price }</p>
          </div>
        ))}
      </div>
      
      {/* Total Price */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Total</h3>
        <p className="text-xl font-bold">${order?.totalPrice}</p>
      </div>
      
      <button className="mt-6 w-full btn text-white bg-violet-800 hover:bg-violet-500" onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default OrderSummary;
