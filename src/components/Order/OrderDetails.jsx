import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getOrderById } from '../../Redux/Orders/Action';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId,order?.orderStatus]);

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId)).then(()=>{
      dispatch(getOrderById(orderId))
    }).then(()=>{
      toast.success(`Your Order has been Cancelled Successfully`,{position:'top-center',autoClose:2000})
    })
  };

  // Define order statuses dynamically
  const steps = [
    { status: 'Placed', date: moment(order?.createdAt).format('ddd, Do MMM \'YY'), expected: '' },
    { status: 'Confirmed', date: order?.orderStatus === 'CONFIRMED' ? moment(order?.createdAt).add(1, 'days').format('ddd, Do MMM \'YY') : '', expected: '' },
    { status: 'Shipped', date: order?.orderStatus === 'SHIPPED' ? moment(order?.createdAt).add(3, 'days').format('ddd, Do MMM \'YY') : '', expected: '' },
    { status: 'Cancelled', date: order?.orderStatus === 'CANCELLED' ? moment(order?.updatedAt).format('ddd, Do MMM \'YY') : '', expected: '' }
  ];

  if (order?.orderStatus !== 'CANCELLED') {
    steps.push({
      status: 'Delivery',
      date: order?.orderStatus === 'DELIVERED' ? moment(order?.createdAt).add(7, 'days').format('ddd, Do MMM \'YY') : '',
      expected: moment(order?.createdAt).add(7, 'days').format('ddd, Do MMM \'YY')
    });
  }

  // Map order status to step index
  const getCurrentStep = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'CONFIRMED': return 1;
      case 'SHIPPED': return 2;
      case 'DELIVERED': return 3;
      case 'CANCELLED': return 4;
      default: return 0;
    }
  };

  const currentStep = getCurrentStep(order?.orderStatus);

  return (
    <div className="container mx-auto px-5 py-24">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        {order?.orderItems.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <img src={item.product.imageUrl} alt={item.product.title} className="w-24 h-24 object-cover rounded-md" />
            <div className="ml-4">
              <p className="text-lg font-semibold">{item.product.title}</p>
              <p className="text-gray-500">{item.product.description}</p>
              <p className="text-lg font-semibold">₹{item.price}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                {index + 1}
              </div>
              <div className={`ml-4 ${index <= currentStep ? 'text-green-500' : 'text-gray-500'}`}>
                <p className="font-semibold">{step.status}</p>
                <p>{step.date || step.expected}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleCancelOrder}
            disabled={currentStep >= 4} // Disable if order is cancelled
          >
            {/* {cancelLoading ? 'Cancelling...' : 'Cancel Order'} */}
            Cancel Order
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
        {/* {cancelError && <div className="text-red-500 mt-2">{cancelError}</div>} */}
        {order?.orderStatus==='CANCELLED' ? (
          <div className="text-green-500 mt-2">
            Order has been cancelled successfully.
          </div>
        ):("")}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OrderDetails;
