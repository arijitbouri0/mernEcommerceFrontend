import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Home'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Products from '../components/Products'

const CustomerRouters = () => {
  return (
    <div>
      <div>
      <NavBar/>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/:lavelOne/:lavelTwo/:laveThree' element={<Products/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default CustomerRouters
