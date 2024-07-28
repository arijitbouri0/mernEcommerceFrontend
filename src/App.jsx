import React from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';
import ProductDetails from './components/ProductView/ProductDetails';
import OrderHistory from './components/Order/OrderHistory'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import OrderDetails from './components/Order/OrderDetails';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Product from './components/ProductView/Product';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product/>} />
        <Route path='/product/id/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<OrderHistory />} />
        <Route path='/order/id/:orderId' element={<OrderDetails />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
