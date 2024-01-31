import React, { useState } from 'react';
import './Login'
import UserInformation from './User';
import Login from './Login';
import Product from './Products';



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function handleLogin(value) {
    setLoggedIn(value);
  }

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
      {isLoggedIn && <UserInformation />}
      <Product />
    </div>
  );
}

export default App;
