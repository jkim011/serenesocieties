import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Nav';
import Home from './pages/Home';

function App() {
  return (
    <div className='pageContainer'>
      <div className='contentWrap'>
        <Router>
          <>
            <NavBar />
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />

            </Routes>
          </>

        </Router>
      </div>
    </div>
  );
}

export default App;
