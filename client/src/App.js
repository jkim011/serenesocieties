import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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

import Footer from './components/Footer';
import About from './pages/misc-pages/About';
import Terms from './pages/misc-pages/Terms';

import Signup from './components/CreateUser';
import AdminDash from './pages/admin/AdminDash';
import ProductsDash from './pages/admin/ProductsDash';
import CategoriesDash from './pages/admin/CategoriesDash';
import InventoryDash from './pages/admin/InventoryDash';
import OrdersDash from './pages/admin/OrdersDash';
import AnalyticsDash from './pages/admin/AnalyticsDash';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: "graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='page-container'>
      <ApolloProvider client={client}>
        <Router>
          <div className='content-wrap'>
            <NavBar />
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
                element={<SingleProduct />}
              />
              <Route
                path={`/signup`}
                element={<Signup />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/terms-and-conditions'
                element={<Terms />}
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ApolloProvider>
      
    </div>
  );
}

export default App;
