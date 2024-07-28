import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrderById, getOrderHistory, placeOrder } from '../../Redux/Orders/Action'; // Adjust the path as necessary
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { order, loading, error, success } = useSelector(state => state.order);
    const orderId = searchParams.get("order_id");
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);


    const handlePlaceOrder = (e) => {
        e.preventDefault();
        dispatch(placeOrder(orderId)).then(() => {
            dispatch(getOrderHistory(user._id)).then(() => {
                navigate('/orders').then(() => {
                    toast.success("Your order has been placed successfully! Payment will be made on delivery.", { position: 'top-center', autoClose: 2000 })
                })
            })
        })

    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="order-items border rounded-lg p-4 bg-white shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                    {order?.orderItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-4">
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.title}
                                className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <span>{item.product.title} (x{item.quantity})</span>
                            <span>${item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-semibold border-t pt-4">
                        <span>Total</span>
                        <span>${order?.totalPrice}</span>
                    </div>
                </div>
                <div className="payment-form border rounded-lg p-4 bg-white shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">
                                Payment Method
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    className="mr-2"
                                    checked
                                    readOnly
                                />
                                <label htmlFor="cod" className="text-sm font-medium">
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
