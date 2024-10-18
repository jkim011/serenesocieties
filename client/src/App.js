import React from 'react';
import { useState, useEffect } from 'react';
import "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import './styles/pages.css';
import './styles/admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Nav';
import Home from './pages/main-pages/Home';
import Shop from './pages/main-pages/Shop';
import SingleProduct from './pages/shop-sections/SingleProduct';
import Gallery from './pages/main-pages/Gallery';
import Lookbook from './pages/main-pages/Lookbook';
import Profile from './pages/main-pages/Profile';
import Cart from "./pages/main-pages/Cart"
import Footer from './components/Footer';
import About from './pages/misc-pages/About';
import Terms from './pages/misc-pages/Terms';
import Signup from './components/user/CreateUser';
import Login from './components/user/Login';
import AdminDash from './pages/admin/AdminDash';
import ProductsDash from './pages/admin/ProductsDash';
import CategoriesDash from './pages/admin/CategoriesDash';
import InventoryDash from './pages/admin/InventoryDash';
import OrdersDash from './pages/admin/OrdersDash';
import AnalyticsDash from './pages/admin/AnalyticsDash';
import EditProduct from './pages/admin/EditProduct';
import Success from './components/cart/Success';
import Cancel from './components/cart/Cancel';
import CartTimer from './components/cart/CartTimer';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './utils/queries';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTrashCan, faCartShopping, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faTrashCan, faCartShopping, faUser, faXmark)


function App() {
  // const [localCartItems, setLocalCartItems] = useState(JSON.parse(localStorage.getItem("allCartItems")) || []);
  // const [loggedInCartItems, setLoggedInCartItems] = useState([]);

  // const { loading, data, error } = useQuery(QUERY_ME);
  // useEffect(() => {
  //   if (!loading && data) {
  //     setLoggedInCartItems(data.me.cartItems || []);
  //   }
  // }, [loading, data]);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setLocalCartItems(JSON.parse(localStorage.getItem("allCartItems")) || []);
  //   };
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);
  // const updateCart = () => {
  //   setLocalCartItems(JSON.parse(localStorage.getItem("allCartItems")) || []);
  // };

  return (
    <div className='page-container'>
      <Router>
        <div className='content-wrap'>
          <NavBar />
          {/* <div>
            {localCartItems.length >= 1 || loggedInCartItems.length >= 1 ? <CartTimer updateCart={updateCart}/> : <></> }
          </div> */}
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/admin-dashboard'
              element={<AdminDash />}
            />
            <Route
              path='/admin-dashboard/manage/products'
              element={<ProductsDash />}
            />
            <Route 
              path={`/admin-dashboard/manage/products/edit/:productId`}
              element={<EditProduct />}
            />
            <Route
              path='/admin-dashboard/manage/inventory'
              element={<InventoryDash />}
            />
            <Route
              path='/admin-dashboard/manage/categories'
              element={<CategoriesDash />}
            />
            <Route
              path='/admin-dashboard/manage/orders'
              element={<OrdersDash />}
            />
            <Route
              path='/admin-dashboard/manage/analytics'
              element={<AnalyticsDash />}
            />
            <Route
              path='/gallery'
              element={<Gallery />}
            />
            <Route
              path='/lookbook'
              element={<Lookbook />}
            />
            <Route
              path='/shop/:routeName'
              element={<Shop />}
            />
            <Route
              path={`/shop/products/:productId`}
              element={<SingleProduct/>}
              // element={<SingleProduct updateCart={updateCart}/>}
            />
            <Route
              path={`/signup`}
              element={<Signup />}
            />
            <Route
              path={`/login`}
              element={<Login />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/profile/'
              element={<Profile />}
            />
            <Route
              path='/terms-and-conditions'
              element={<Terms />}
            />
            <Route
              path="/cart"
              element={<Cart/>}
              // element={<Cart updateCart={updateCart}/>}
            />
            <Route
              path="/success"
              element={<Success/>}
            />
            <Route
              path="/cancel"
              element={<Cancel/>}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
      
    </div>
  );
}

export default App;
