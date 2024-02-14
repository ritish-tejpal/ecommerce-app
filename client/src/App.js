import React from 'react';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import Home from './components/Home';
import Signup from './Signup';
import Product from './Products';
import Login from './Login';
import VerifyOTP from './components/VerifyOTP';


function App() {
  return (
      <div className="App">
        <CssBaseline>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/products' element={ <Product /> } />
            <Route path='/verify' element={<VerifyOTP /> } />
          </Routes>
        </CssBaseline>
      </div>
  );
}

export default App;
