import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Nav';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Gallery from './pages/Gallery';
import Lookbook from './pages/Lookbook';
import Footer from './components/Footer';

import NaturalEssence from './pages/shop-sections/NaturalEssence';
import Halloween from './pages/shop-sections/Halloween';
import AllApparel from './pages/shop-sections/AllApparel';
import AllPosters from './pages/shop-sections/AllPosters';

function App() {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Router>
          <>
            <NavBar />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/shop'
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
                path='/all-apparel'
                element={<AllApparel />}
              />
              <Route
                path='/all-posters'
                element={<AllPosters />}
              />
              <Route
                path='/natural-essence'
                element={<NaturalEssence />}
              />
              <Route
                path='/halloween-special'
                element={<Halloween />}
              />
            </Routes>
          </>

        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
