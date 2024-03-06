import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Products from './Products';
import Product from './components/products/Product';
import Login from './components/auth/Login';
import Verify from './components/auth/Verify';
import Accounts from './components/user/Accounts';
import Logout from './components/auth/Logout';
import Cart from './components/user/Cart';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, []);

  return (
      <div className="App">
          <Routes>
            <Route path='/' element={ <Layout /> }>
              <Route index element={<Home />} />
              <Route path='signup' element={ <Signup /> } />
              <Route path='login' element={ <Login /> } />
              <Route path='logout' element={ <Logout /> } />
              <Route path='products' element={ <Products /> } />
              <Route path='products/:name' element={ <Product /> } />
              <Route path='verify' element={<Verify /> } />
              <Route path='accounts' element={<Accounts />} />
              <Route path='cart' element={<Cart />} />
            </Route>
          </Routes>
      </div>
  );
}

export default App;

