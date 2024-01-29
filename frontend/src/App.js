import React, { useState } from 'react';
import './Login'
import UserInformation from './User';
import Login from './Login';



function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  function handleLogin(value) {
    setLoggedIn(value);
  }

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
      {isLoggedIn && <UserInformation />}
    </div>
  );
}

export default App;
