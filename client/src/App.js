import React from 'react';
import logo from './logo.svg';
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

function App() {
  return (
    <div className='page-container'>
        <Router>
          <>
          <div className='content-wrap'>
            <NavBar />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/shop/all-products'
                element={<Shop />}
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
          </>
        </Router>
      
    </div>
  );
}

export default App;
