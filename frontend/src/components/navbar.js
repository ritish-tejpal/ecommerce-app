import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Login';
import Signup from '../Signup';
import Home from './Home';

function Navbar(props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </ul>
        <BrowserRouter>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/products" element={<Products />} /> */}
          </Routes>
        </BrowserRouter>
      </nav>
    </div>
  );
}

export default Navbar;