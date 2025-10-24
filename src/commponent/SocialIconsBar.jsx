import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaGithub } from "react-icons/fa";

const SocialIconsBar = () => {
  const icons = [
    { component: FaTwitter, href: "https://twitter.com" },
    { component: FaInstagram, href: "https://instagram.com" },
    { component: FaFacebookF, href: "https://facebook.com" },
    { component: FaGithub, href: "https://github.com" },
  ];

  return (
    <div className="flex space-x-6 justify-center items-center mt-6">
      {icons.map((icon, index) => {
        const IconComponent = icon.component;
        return (
          <a
            key={index}
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center"
          >
            <IconComponent className="w-8 h-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIconsBar;
