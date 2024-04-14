import React from 'react'
import Navbar from '../../pages/nav/Navbar';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <div className='layout'>
        <Navbar />
        <Outlet />  
        <Footer />
    </div>
  )
}

export default Layout