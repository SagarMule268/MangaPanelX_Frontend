import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" text-black px-6 py-3 ">
      <div className="container mx-auto flex justify-between items-center">
       
        {/* Logo */}
        <Link to="/" className=" font-lobster bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          {/* <img src="new_logo.png" width={"200px"} alt="" /> */}
          MangaPanelX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">

          <Link to="/" className=" font-bold hover:text-pink-400">Home</Link>
          <Link to="/manga" className=" font-bold hover:text-pink-400">Manga</Link>
          <Link to="/about" className=" font-bold hover:text-pink-400">About</Link>
        </div>
              
        {/* Mobile Menu Button */}
        <buttonpink
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </buttonpink>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-3 space-y-2 bg-gray-800 p-4 rounded-lg">

          <Link to="/" className=" font-bold hover:text-pink-400">Home</Link>
          <Link to="/manga" className=" font-bold hover:text-pink-400">Manga</Link>
          <Link to="/search" className=" font-bold hover:text-pink-400">Search</Link>
          <Link to="/about" className="  font-bold hover:text-pink-400">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
