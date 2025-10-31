import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter,FaGithubSquare } from "react-icons/fa";
import SocialIconsBar from "./SocialIconsBar";

const Footer = () => {
  return (
    <footer className=" text-black py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left - Branding */}
        <h2 className="text-xl font-lobster">MangaPanelX</h2>

        {/* Middle - Links */}
        <div className="flex space-x-6 font-bold  mt-4 md:mt-0  ">
          <a href="/about" className="hover:text-pink-500">About</a>
          
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://www.instagram.com/sagar__75175/" target="_blank" rel="noreferrer">
            <FaInstagram className="text-2xl drop-shadow-2xl  hover:text-pink-500 transition hover:drop-shadow-2xl shadow-pink-300" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-2xl hover:text-blue-500 transition" />
          </a>
          <a href="https://github.com/SagarMule268/" target="_blank" rel="noreferrer">
            <FaGithubSquare className="text-2xl hover:text-purple-900 transition" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm mt-4 text-gray-700">
        © {new Date().getFullYear()} MangaPanelX. All Rights Reserved.
        |Data and images sourced from <a href="https://mangadex.org/" target="_blank">mangadex.org</a>
.
      </div>
    </footer>
  );
};

export default Footer;
