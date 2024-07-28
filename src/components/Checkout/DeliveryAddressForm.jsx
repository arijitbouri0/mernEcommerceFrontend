import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../Redux/Orders/Action';
import { useNavigate } from 'react-router-dom';
import {getUser} from '../../Redux/Auth/Action'
import { ToastContainer } from 'react-toastify';

const DeliveryAddressForm = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    address: '',
    state: '',
    pincode: '',
    mobile: '',
    email: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user} = useSelector(state => state.auth)
  const {loading,error}=useSelector(state=>state.order);
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);
  

  useEffect(() => {
    if (selectedAddress) {
      setForm({
        firstname: selectedAddress.firstname,
        lastname: selectedAddress.lastname,
        address: selectedAddress.address,
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        mobile: selectedAddress.mobile,
        email: selectedAddress.email
      });
    }
  }, [selectedAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmit = () => {
    dispatch(createOrder({ form, navigate }));
  };

  return (
    <div className="flex flex-wrap container mx-auto py-10 p-4">
      <div className="w-full md:w-1/3 p-2 overflow-y-auto max-h-96"> {/* Limiting height and enabling scroll */}
        <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
        {user?.address.map(address => (
          <div key={address._id} className="border p-4 mb-4 cursor-pointer" onClick={() => handleSelectAddress(address)}>
            <h3 className="font-bold">{address.firstname + ' ' + address.lastname}</h3>
            <p>{address.address}</p>
            <p>{address.state}, {address.pincode}</p>
            <p>{address.mobile}</p>
            <p>{address.email}</p>
            <button className="btn mt-2" onClick={() => handleSelectAddress(address)}>Deliver Here</button>
          </div>
        ))}
      </div>

      <div className="w-full md:w-2/3 p-2">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input name="firstname" value={form.firstname} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input name="lastname" value={form.lastname} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input name="address" value={form.address} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
            <input name="state" value={form.state} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Pin Code</label>
            <input name="pincode" value={form.pincode} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input name="mobile" value={form.mobile} onChange={handleInputChange} className="w-full p-2 border rounded" type="text" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input name="email" value={form.email} onChange={handleInputChange} className="w-full p-2 border rounded" type="email" />
        </div>
        <div className="flex space-x-4">
          <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Deliver Here'}
          </button>
          <button className="btn bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setForm({
            firstname: '',
            lastname: '',
            address: '',
            state: '',
            pincode: '',
            mobile: '',
            email: ''
          })}>Cancel</button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default DeliveryAddressForm;
