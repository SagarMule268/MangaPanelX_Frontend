import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-blue-300 via-pink-100 to-blue-300
'>
        <Navbar/>
        <div className='flex-1'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout
