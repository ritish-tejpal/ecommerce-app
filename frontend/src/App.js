import React from 'react';
import './Login'
import Navbar from './components/navbar';
// import Signup from './Signup';
import Home from './components/Home';


function App() {
  return (
      <div className="App">
        <h1>The Web Store</h1>
        <Navbar />
        <Home />
      </div>
  );
}

export default App;
