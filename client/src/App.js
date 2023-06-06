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
import './styles/pages.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Nav';
import Home from './pages/main-pages/Home';
import Shop from './pages/main-pages/Shop';
import Gallery from './pages/main-pages/Gallery';
import Lookbook from './pages/main-pages/Lookbook';
import Footer from './components/Footer';
import About from './pages/misc-pages/About';
import Terms from './pages/misc-pages/Terms';

import NaturalEssence from './pages/collections/NaturalEssence';
import Halloween from './pages/collections/Halloween';
import AllApparel from './pages/shop-sections/AllApparel';
import AllPosters from './pages/shop-sections/AllPosters';
import SingleProduct from './pages/shop-sections/SingleProduct';

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
                path='/gallery'
                element={<Gallery />}
              />
              <Route
                path='/lookbook'
                element={<Lookbook />}
              />
              <Route
                path='/shop/all-products'
                element={<Shop />}
              />
              <Route
                path={`/shop/:productId`}
                element={<SingleProduct />}
              />
              <Route
                path='/shop/all-apparel'
                element={<AllApparel />}
              />
              <Route
                path='/shop/all-posters'
                element={<AllPosters />}
              />
              <Route
                path='/shop/natural-essence'
                element={<NaturalEssence />}
              />
              <Route
                path='/shop/halloween-special'
                element={<Halloween />}
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
