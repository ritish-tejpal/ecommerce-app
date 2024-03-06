import React, { useEffect, useState } from 'react'

import SearchBar from './SearchBar'

import cart from '../assets/cart.png'
import searchbar from '../assets/search.png'

const Navbar = () => {
  const [search, setSearch] = useState(false)
  const [toggle, setToggle] = useState(false)
  
  const searchBar = () => {
    setSearch(!search);
  }

  const toggleMenu = (state) => {
    setToggle(state);
  }

  const handleMenuHover = (state) => {
    setToggle(state);
  }

  return (
    <nav className=' bg-green-400 p-4 '>
      <div className=' container mx-auto flex justify-between items-center '>
          <a a href="/" className=' flex items-center space-x-3 px-4 '>
            <img src={cart} alt="cart-icon" className=' h-8 bg-green-400' />
            <div className=' text-3xl text-green-700 '>
              E-Commerce Store
            </div>
          </a>
          <ul className=' flex space-x-4 text-green-200 text-lg px-4 '>
            <li className='hover:text-green-700'>
              <a href="/login">
                Login
              </a>
            </li>
            <li className='hover:text-green-700'>
              <a href="/logout">
                Logout
              </a>
            </li>
            <li className='hover:text-green-700'>
              <a href="/signup">
                Signup
              </a>
            </li>
            <li className='hover:text-green-700'>
              <a href="/products">
                Products
              </a>
            </li>
            <li className='relative'>
              <button
                onMouseEnter={() => toggleMenu(true)}
                onMouseLeave={() => toggleMenu(false)}
                className='text-green-200 hover:text-green-700 focus:outline-none'
              >
                More
              </button>
              {toggle && (
                <div 
                  className=' absolute right-0 bg-white shadow-xl rounded'
                  onMouseEnter={() => handleMenuHover(true)}
                  onMouseLeave={() => handleMenuHover(false)} 
                >
                  <ul className=' py-2 text-sm whitespace-nowrap'>
                    <li>
                      <a href="/accounts" className=' block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                        My Account
                      </a>
                    </li>
                    <li>
                      <a href="/cart" className=' block px-4 py-2 text-gray-800 hover:bg-gray-200'>
                        My Cart
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
          {/* <>
              <button onClick={setSearch}>
                Search
              </button>
          </> */}
          <SearchBar />
      </div>
    </nav> 
  )
}

export default Navbar;