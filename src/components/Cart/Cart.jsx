import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeCartItem, updateCartItem } from '../../Redux/Cart/Action';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ open, setOpen}) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const auth =useSelector(state=>state.auth);
  const navigate=useNavigate();

  useEffect(() => {
    
    if (open) {
      if(auth.user){
        dispatch(getCart());
      }
    }
  }, [dispatch, open,auth?.user]);

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCartItem(cartItemId)).then(() => {
      dispatch(getCart());
    });
  };

  const handleUpdateQuantity = (cartItemId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ cartItemId, quantity })).then(() => {
        dispatch(getCart());
      });
    }
  };

  const handleNext=()=>{
    if(cart?.data?.totalItems>0){
      setOpen(false)
      navigate('/checkout/?step=1');
    }
    else if(!auth.user){
      navigate('/');
      setOpen(false)
      toast.error("Please Login",{position:'top-center',autoClose:5000});
    }
    else{
      setOpen(false);
      navigate('/products');
      toast.info("Please add Items",{position:'top-center',autoClose:5000})
    }
  }

  return (
    <>
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md mt-16">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {cart?.data?.cartItems && cart.data.cartItems.length > 0 ? (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart?.data?.cartItems.map((item) => (
                                <li key={item._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={item.product.imageUrl}
                                      alt={item.product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <NavLink to={`/product/id/${item.product._id}`}>{item.product.title}</NavLink>
                                        </h3>
                                        <p className="ml-4">${item.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <button
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                                      >
                                        -
                                      </button>
                                      <p className="text-gray-500">Qty {item.quantity}</p>
                                      <button
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                                      >
                                        +
                                      </button>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => handleRemoveItem(item._id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-center text-gray-500">Your cart is empty.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cart?.data.totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        {/* <NavLink
                          to="/checkout/?step=1"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </NavLink> */}
                        <button onClick={handleNext} className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    <ToastContainer/>
    </>
  );
};

export default Cart;
