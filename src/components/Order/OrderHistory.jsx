import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderHistory } from '../../Redux/Orders/Action';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orderHistory, loading, error } = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(getOrderHistory(user._id));
    }
  }, [dispatch, user,orderHistory?.length]);

  if (loading) return (
    <div className="flex justify-center items-center h-full py-28">
      <MoonLoader />
    </div>
  );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-28">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orderHistory?.map((order) => (
        <NavLink to={`/order/id/${order._id}`} key={order._id}>
          <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order {order._id}</span>
              <span>{moment(order.orderDate).format('YYYY-MM-DD')}</span>
            </div>
            <div className="flex justify-between mb-2">
              {order.orderStatus === 'CANCELLED' ? (
                <span className="font-semibold">
                  Cancelled on: {moment(order.cancelledOn).format('ddd, Do MMM YYYY')}
                </span>
              ) : (
                <span className="font-semibold">
                  Expected Delivery on: {moment(order.orderDate).add(7, 'days').format('ddd, Do MMM YYYY')}
                </span>
              )}
              <span className={`status ${order.orderStatus === 'DELIVERED' ? 'text-green-500' : 'text-yellow-500'}`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="mb-2">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <span>{item.product.title} (x{item.quantity})</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order?.totalPrice}</span>
            </div>
          </div>
        </NavLink>
      ))} 
      <ToastContainer/>
    </div>
   
  );
};

export default OrderHistory;
